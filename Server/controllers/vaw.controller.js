const { db , sequelize } = require('../config/config');
const UserModel = require('../models/User.model');
const logController = require('./log.controller');
const request = require('request')
const requestIP = require('request-ip');
const UAParser = require('ua-parser-js');
const parser = new UAParser();
const createError = require('http-errors');

exports.getUserDetailsByUserId = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const queryText = `SELECT a.user_id, a."password", a."role", a."userName" , b."GPCode" , 
            b."BlockCode", c."Dist_Code" FROM users a 
            INNER JOIN "VAWGpMapping" b ON a.user_id = b."VAWCode"
            INNER JOIN "LGGP" c ON b."GPCode" = c."Gp_Code"
            WHERE a.user_id = '${user_id}'`
            // console.log(queryText);
            const response = await db.sequelize.query(queryText);
            // console.log(response[0][0]);
            // let response = await UserModel.findOne({ where: { user_id: user_id }, raw: true });
            resolve(response[0][0]);
        } catch (e) {
            reject(e);
        }
    })
}

exports.getDemonstrationData = async (req, res) => {
    try {
       
        const queryText = `SELECT a.* , aa."schemeName", bb."SubschemeName" , b."CompName" , c."CropName" , d."SubCropName" , e."Variety_Name" ,
        dd."SubCropName" AS bpSubCropName, ee."Variety_Name" AS bpCropVarietyName
        FROM "DemonstrationPatchMaster" a
        INNER JOIN "SchemeMaster" aa ON a."schemeId" = aa."schemeId"
        INNER JOIN "SubSchemeMaster" bb ON a."SubschemeId" = bb."SubschemeId"
        INNER JOIN "ComponentMaster" b ON a."CompId" = b."CompId" AND b."Fin_Year" = a."Fin_Year"
        LEFT JOIN "CropMaster" c ON a."CropId" = c."CropId"
        LEFT JOIN "SubCropMaster" d ON a."SubCropId" = d."SubCropId"
        LEFT JOIN "CropVarietyMaster" e ON a."Variety_Code" = e."Variety_Code"
        LEFT JOIN "SubCropMaster" dd ON a."BP_SubCropId" = dd."SubCropId"
        LEFT JOIN "CropVarietyMaster" ee ON a."BP_Variety_Code" = ee."Variety_Code"
        WHERE "vaw_userId" ='${req.payload.user_id}';`
        
        const result = await db.sequelize.query(queryText);

        res.send(result[0]);
    } catch (e) {
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}

exports.getDistrictPrefix = async (req, res) => {
    try {
        const queryText = `SELECT "Dist_Name","Dist_Prefix" FROM public."LGDistricts" WHERE "Dist_Code" = '${req.query.Dist_Code}';`
        const result = await db.sequelize.query(queryText);
        res.send(result[0][0]);
    } catch (e) {
        console.error(e);
        res.status(500).send('Unexpected error')
    }
}

exports.checkFarmerRegistredOrNot = async (req, res) => {
    try {
        if(req.query.schemeId == 'scheme_3'){
            const queryText = `SELECT exists (SELECT 1 FROM "Farmer_Permit" WHERE "FarmerId" = '${req.query.FarmerID}' AND "SubschemeId"='${req.query.SubschemeId}'  LIMIT 1);`
            const result = await db.sequelize.query(queryText);
            // console.log(result)
            res.send(result[0][0]);
        } else {
            const queryText = `SELECT exists (SELECT 1 FROM "Farmer_Permit" WHERE "FarmerId" = '${req.query.FarmerID}' AND "schemeId"='${req.query.schemeId}'  LIMIT 1);`
            const result = await db.sequelize.query(queryText);
            // console.log(result)
            res.send(result[0][0]);
        }
        
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}


exports.SubmitfarmerDetails = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const data = req.body
        const targetCount = { AvlPhyGen: 0, AvlPhySCP: 0, AvlPhyTASP: 0 ,tempGenTarget : 0, tempScTarget : 0 , tempStTarget : 0 , areaLandGen: 0, areaLandSCP: 0, areaLandTASP: 0 }
        data.forEach( e => {
            switch(e.Farmer_Category) {
                case 'General': {
                    targetCount.AvlPhyGen += +e.LandArea.toFixed(1);
                    targetCount.tempGenTarget = 0;
                    break
                }
                case 'SC': {
                    targetCount.areaLandSCP += +e.LandArea.toFixed(1);
                    targetCount.tempScTarget += +e.tempGenCat.toFixed(1);
                    targetCount.AvlPhySCP = JSON.parse((Number(+targetCount.areaLandSCP - +targetCount.tempScTarget)).toFixed(1))
                    break
                }
                case 'ST': {
                    targetCount.areaLandTASP += +e.LandArea.toFixed(1);
                    targetCount.tempStTarget += +e.tempGenCat.toFixed(1);
                    targetCount.AvlPhyTASP = JSON.parse((Number(+targetCount.areaLandTASP - +targetCount.tempStTarget)).toFixed(1));
                    break
                }
            }
        })
        // console.log("targetCount",targetCount);

        data.forEach(e => {
            e.Added_By = req.payload.user_id,
            e.AddedOn = `${Date()}`,
            e.Status = 0,
            e.IPAddress = requestIP.getClientIp(req)
        });
            

        const demoTarget = await db.DemonstrationPatch.findOne({ where: {Dist_Code: data[0].Dist_Code, Block_Code: data[0].Block_Code , DemostrationId: data[0].DemonstrationId}, raw:true })
        
        // if(targetCount.AvlPhyGen > demoTarget.AvlPhyGen || targetCount.AvlPhySCP > demoTarget.AvlPhySCP || targetCount.AvlPhyTASP > demoTarget.AvlPhyTASP)
        // return res.send({ message: "Invalid Target.Target exceeds the available target" })

        if(targetCount.AvlPhyGen > demoTarget.AvlPhyGen || targetCount.AvlPhySCP > +demoTarget.AvlPhySCP || targetCount.AvlPhyTASP > +demoTarget.AvlPhyTASP || targetCount.tempStTarget > (+demoTarget.AvlPhyGen - targetCount.AvlPhyGen - targetCount.tempScTarget - targetCount.tempStTarget) ||
        targetCount.tempScTarget > (+demoTarget.AvlPhyGen - targetCount.AvlPhyGen - targetCount.tempScTarget - targetCount.tempStTarget))
        return res.send({ message: "Invalid Target.Target exceeds the available target" })

        // const updateDemonstrationTarget= {
        //     AvlPhyGen : +demoTarget.AvlPhyGen - targetCount.AvlPhyGen - targetCount.tempScTarget - targetCount.tempStTarget || 0,
        //     AvlPhySCP : +demoTarget.AvlPhySCP - targetCount.AvlPhySCP || 0,
        //     AvlPhyTASP : +demoTarget.AvlPhyTASP - targetCount.AvlPhyTASP || 0,
        //     DistributedPhyGen : +demoTarget.DistributedPhyGen + targetCount.AvlPhyGen + targetCount.tempScTarget + targetCount.tempStTarget || 0,
        //     DistributedPhySCP : +demoTarget.DistributedPhySCP + targetCount.AvlPhySCP || 0,
        //     DistributedPhyTASP : +demoTarget.DistributedPhyTASP + targetCount.AvlPhyTASP || 0
        // }

        const updateDemonstrationTarget= {
                AvlPhyGen : JSON.parse((Number(+demoTarget.AvlPhyGen - +targetCount.AvlPhyGen - +targetCount.tempScTarget - +targetCount.tempStTarget)).toFixed(1)) || 0,
                AvlPhySCP : JSON.parse((Number(+demoTarget.AvlPhySCP - +targetCount.AvlPhySCP)).toFixed(1)) || 0,
                AvlPhyTASP : JSON.parse((Number(+demoTarget.AvlPhyTASP - +targetCount.AvlPhyTASP)).toFixed(1)) || 0,
                DistributedPhyGen : JSON.parse((Number(+demoTarget.DistributedPhyGen + +targetCount.AvlPhyGen + +targetCount.tempScTarget + +targetCount.tempStTarget)).toFixed(1)) || 0,
                DistributedPhySCP : JSON.parse((Number(+demoTarget.DistributedPhySCP + +targetCount.AvlPhySCP)).toFixed(1)) || 0,
                DistributedPhyTASP : JSON.parse((Number(+demoTarget.DistributedPhyTASP + +targetCount.AvlPhyTASP)).toFixed(1)) || 0 ,
                updatedAt :`${Date()}`
            }

        // console.log("updateDemonstrationTarget" , updateDemonstrationTarget);
        const farmerRegistrationResult = await db.farmerPermit.bulkCreate(data , { transaction: t });
        const updateDemoTarget = await db.DemonstrationPatch.update(updateDemonstrationTarget,{ where: { Dist_Code: data[0].Dist_Code, Block_Code: data[0].Block_Code , DemostrationId: data[0].DemonstrationId }, transaction: t })
        
        farmerRegistrationResult.forEach(e => {
                var sms = `Cluster ID '${e.DemonstrationId}' is registered against your  farmer ID '${e.FarmerId}' .DAFP AGRIOR`;
                // var mobileNo = e.MobileNo
                var mobileNo = 7978565520
                request(`http://mkuy.apicol.nic.in/Registration/EPestSMSNew?template_id=1107165632272214847&type=SMS&mobileNo=${mobileNo}&sms=${sms}`, {
                json: true
                }, (err, resp, body) => {
                if (err) {
                    console.log(err);
                } 
            });
        });

        res.send({ message: "Farmer registered Successfully." })
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'Submit', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

        await t.commit();
    } catch (e) {
        await t.rollback();
        console.error(e);
        next(createError.InternalServerError());
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'Submit', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    }
}

exports.DeleteFarmerDetails = async (req, res , next) => {
    const t = await sequelize.transaction();
    try {
        const permitNo = req.query.permit_NO
        const demoTarget = await db.DemonstrationPatch.findOne({ where: {DemostrationId: req.query.DemostrationId}, raw:true , transaction: t  })
        
        const farmerPrevData = await db.farmerPermit.findOne({ where: { FarmerId: req.query.FarmerId , Permit_NO : permitNo, DemonstrationId: req.query.DemostrationId }, raw:true , transaction: t })
        
        // console.log("farmerPrevData" , farmerPrevData);

        const targetCount = { AvlPhyGen: +demoTarget.AvlPhyGen, AvlPhySCP: +demoTarget.AvlPhySCP, AvlPhyTASP: +demoTarget.AvlPhyTASP }

        if (farmerPrevData.normalCompTarget == 1) {

                targetCount.AvlPhyGen = JSON.parse(Number(+demoTarget.AvlPhyGen + +farmerPrevData.LandArea).toFixed(1));
                targetCount.DistributedPhyGen = JSON.parse(Number(+demoTarget.DistributedPhyGen - +farmerPrevData.LandArea).toFixed(1))

        } else {
                switch(farmerPrevData.Farmer_Category) {
                    case 'General' : {
                        targetCount.AvlPhyGen = JSON.parse(Number(+demoTarget.AvlPhyGen + +farmerPrevData.LandArea).toFixed(1));
                        targetCount.DistributedPhyGen = JSON.parse(Number(+demoTarget.DistributedPhyGen - +farmerPrevData.LandArea).toFixed(1)) 
                        break
                    }
                    case 'SC' : {
                        targetCount.AvlPhySCP = JSON.parse(Number(+demoTarget.AvlPhySCP + +farmerPrevData.LandArea).toFixed(1));
                        targetCount.DistributedPhySCP = JSON.parse(Number(+demoTarget.DistributedPhySCP -  +farmerPrevData.LandArea).toFixed(1)) 
                        break
                    }
                    case 'ST' : {
                        targetCount.AvlPhyTASP = JSON.parse(Number(+demoTarget.AvlPhyTASP + +farmerPrevData.LandArea).toFixed(1));
                        targetCount.DistributedPhyTASP = JSON.parse(Number(+demoTarget.DistributedPhyTASP -  +farmerPrevData.LandArea).toFixed(1))
                        break
                    }
                }
           
        }
        // console.log(targetCount);
        const queryText = `DELETE FROM public."Farmer_Permit" WHERE "Permit_NO" = '${req.query.permit_NO}'`
        const result = await db.sequelize.query(queryText);
        const updateDemoTarget = await db.DemonstrationPatch.update(targetCount,{ where: { DemostrationId: req.query.DemostrationId }, transaction: t })
        res.send({"message" : "Data deleted successfully."});

        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'DELETE', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
        await t.commit();
    } catch (e) {
        await t.rollback();
        console.error(e);
        next(createError.InternalServerError());
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'DELETE', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    }
}

exports.FinalSubmitfarmerDetails = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        data = req.body[0];
        const promiseArray = []
        const promiseArray1 = []
        data.forEach(e => {
            farmerDetails = db.farmerPermit.update({ Status : 1 , IPAddress : requestIP.getClientIp(req) },{ where: { FarmerId: e.FarmerId , Permit_NO : e.Permit_NO, DemonstrationId: e.DemonstrationId }, transaction: t });
            promiseArray.push(farmerDetails)
        });
        const result = await Promise.all(promiseArray)
        data.forEach(e => {
            confirmStatusByVAW = db.DemonstrationPatch.update({ ConfirmBy_vaw : 1 },{ where: { DemostrationId: e.DemonstrationId }, transaction: t });
            promiseArray1.push(confirmStatusByVAW)
        });
        
        const result1 = await Promise.all(promiseArray1)
        res.send({message : "Farmer Details updated Successfully."})
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'Submit', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

        await t.commit();
    } catch (e) {
        await t.rollback();
        console.log(e);
        next(createError.InternalServerError())
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'Submit', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    }
}

exports.getAllFarmerList = async (req, res , next) => {
    try {
        const queryText = `SELECT * FROM public."Farmer_Permit" WHERE "DemonstrationId" = '${req.query.DemonstrationId}' `
        const result = await db.sequelize.query(queryText);
        const queryText1 = `SELECT "ConfirmBy_vaw" , "ConfirmBy_BAO" FROM "DemonstrationPatchMaster" WHERE "DemostrationId" = '${req.query.DemonstrationId}'`
        const data = await db.sequelize.query(queryText1);
        res.send({farmerList : result[0], demoStatus: data[0]});
    } catch (e) {
        console.error(e);
        next(createError.InternalServerError());

    }
}

exports.getAllApprovedFarmerList = async (req, res , next) => {
    try {
        const queryText = `SELECT a."FarmerId", a."FarmerName", a."LandArea", a."Farmer_Category", a."Gender", a."CompId", b."Seed_Per_ha" ,
        a."LandArea" * b."Seed_Per_ha" AS seedRequired , b."Unit" , c."CompName" , d."CropName" ,
        e."Variety_Name" , f."SubCropName",  a."LandArea" * CAST((case when g."itemPackageSize" = '' then '0' else g."itemPackageSize" end) as int) as bpSeedRequired ,
        g."IndicativeCost" as bpItemCost , g."item_unit" as bpUnit
        FROM "Farmer_Permit" a
        INNER JOIN "ComponentCostMapping" b ON a."CompId" = b."CompId"
        INNER JOIN "ComponentMaster" c ON a."CompId" = c."CompId"
        INNER JOIN "CropMaster" d ON a."CropId" = d."CropId"
        INNER JOIN "CropVarietyMaster" e ON a."Variety_Code" = e."Variety_Code"
        LEFT JOIN "SubCropMaster" f ON a."SubCropId" = f."SubCropId"
        LEFT JOIN "itemPackageMaster" g ON a."bp_ItemId" = g."ItemId"
        WHERE "DemonstrationId" = '${req.query.DemonstrationId}'`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        console.error(e);
        next(createError.InternalServerError());

    }
}

exports.ConfirmSeedDistributionStatus = async (req, res , next) => {
    try {
        const data = {
            SeedDistributionStatus : 'Over',
            SeedDistributedOn : Date(),
            SeedDistributedBy : req.payload.user_id
        }
        const Result = await db.DemonstrationPatch.update({ SeedDistributionStatus : 'Over', SeedDistributedOn: Date(), SeedDistributedBy: req.payload.user_id} , {where: { DemostrationId: req.query.DemonstrationId }})
        res.send({message : `Successfully Seed Distributed.`});
    } catch (e) {
        console.error(e);
        next(createError.InternalServerError());

    }
}

exports.getTotalLandCount = async (req, res , next) => {
    try {
        const queryText = `SELECT SUM("LandArea") as TotalLand FROM public."Farmer_Permit" WHERE "DemonstrationId" = '${req.query.DemonstrationId}'`
        // console.log(queryText);
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        console.error(e);
        next(createError.InternalServerError());

    }
}

exports.getTotalSeedCount = async (req, res , next) => {
    try {
        const queryText = `SELECT * FROM "ComponentCostMapping" WHERE "CompId" = '${req.query.CompId}'`
        // console.log(queryText);
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        console.error(e);
        next(createError.InternalServerError());

    }
}

exports.getAllFarmerDetails = async (req, res , next) => {
    try {
        const queryText = `SELECT * FROM public."Farmer_Permit" WHERE "FarmerId" = '${req.query.FarmerId}';`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        console.error(e);
        next(createError.InternalServerError());
    }
}

exports.getDemonstrationIdCount = async (req,res) => {
    try {
        const queryText = `SELECT COUNT(DISTINCT(a."DemostrationId")) as TotalDemonstrationId ,COUNT(DISTINCT(b."FarmerId")) as TotalFarmer,
        SUM(CASE WHEN b."Farmer_Category"  = 'General' THEN 1 ELSE 0 END) as "GenFarmer",SUM(CASE WHEN b."Farmer_Category"  = 'SC' THEN 1 ELSE 0 END) as "SCFarmer",
        SUM(CASE WHEN b."Farmer_Category"  = 'ST' THEN 1 ELSE 0 END) as "STFarmer"
        FROM "DemonstrationPatchMaster" a
        LEFT JOIN "Farmer_Permit" b ON b."DemonstrationId" = a."DemostrationId"
        WHERE "vaw_userId" = '${req.payload.user_id}';`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e); 
    }
}

exports.getDemonstrationReport = async (req, res) => {
    try {
        const queryText = ` SELECT f."Dist_Name",g."Block_Name",a."Gp_Code",h."Gp_Name",aa."schemeName", bb."SubschemeName" , b."CompName" , c."CropName" , d."SubCropName" , e."Variety_Name" ,
        dd."SubCropName" AS bpSubCropName, ee."Variety_Name" AS bpCropVarietyName
        FROM "DemonstrationPatchMaster" a
        INNER JOIN "SchemeMaster" aa ON a."schemeId" = aa."schemeId"
        INNER JOIN "SubSchemeMaster" bb ON a."SubschemeId" = bb."SubschemeId"
        INNER JOIN "ComponentMaster" b ON a."CompId" = b."CompId" 
        INNER JOIN "CropMaster" c ON a."CropId" = c."CropId"
        INNER JOIN "SubCropMaster" d ON a."SubCropId" = d."SubCropId"
        INNER JOIN "CropVarietyMaster" e ON a."Variety_Code" = e."Variety_Code"
        LEFT JOIN "SubCropMaster" dd ON a."BP_SubCropId" = dd."SubCropId"
        LEFT JOIN "CropVarietyMaster" ee ON a."BP_Variety_Code" = ee."Variety_Code"
        INNER JOIN "LGDistricts" f ON a."Dist_Code" = f."Dist_Code"
        INNER JOIN "LGBlocks" g ON a."Block_Code" = g."Block_Code"
        LEFT JOIN  "LGGP" h ON a."Gp_Code" = h."Gp_Code"
        WHERE "DemostrationId" ='${req.query.DemostrationId}';`

        const GpData = []
        const result = await db.sequelize.query(queryText);
        var GPCode = result[0][0].Gp_Code.split(',')

        GPCode.forEach(async(e,key) => {
            const queryText1 = `SELECT "Gp_Code" , "Gp_Name" FROM "LGGP" WHERE "Gp_Code" = '${e}';`
            const result1 = await db.sequelize.query(queryText1);
            GpData.push(result1[0][0]);
            if (key+1==GPCode.length) {
                res.send({result:result[0],GpData:GpData});
            }
        });
        
    } catch (e) {
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}




// exports.UpdateFarmerDetails = async (req, res , next) => {
//     try {
//         const data = req.body

//         const demoTarget = await db.DemonstrationPatch.findOne({ where: {DemostrationId: data.demonstrationId}, raw:true })
        
//         const farmerPrevData = await db.farmerPermit.findOne({ where: { FarmerId: data.farmerId , Permit_NO : data.permit_NO, DemonstrationId: data.demonstrationId }, raw:true })

//         if(farmerPrevData.LandArea == data.landArea) {
//             return res.send({ message: `Land area not changed` })
//         }
//         console.log("demoTarget" , demoTarget);

//         // if(data.LandArea > demoTarget.AvlPhyGen || data.LandArea > demoTarget.AvlPhySCP || data.LandArea > demoTarget.AvlPhyTASP)
//         // return res.send({ message: "Invalid Target.Target exceeds the available target" })

//         const targetCount = { AvlPhyGen: 0, AvlPhySCP: 0, AvlPhyTASP: 0 }
//         const modifiedLand = farmerPrevData.LandArea - data.landArea
//         console.log(modifiedLand); 
//         switch(data.farmerCatagory) {
//             case 'General': {
//                 if( +data.landArea > +demoTarget.AvlPhyGen )
//                 return res.send({ message: "Invalid Target.Target exceeds the available target" })
//                 targetCount.AvlPhyGen = +demoTarget.AvlPhyGen + +modifiedLand;
//                 targetCount.DistributedPhyGen = +demoTarget.DistributedPhyGen -  +modifiedLand 
//                 break
//             }
//             case 'SC': {
//                 if( data.landArea > demoTarget.AvlPhySCP )
//                 return res.send({ message: "Invalid Target.Target exceeds the available target" })
//                 targetCount.AvlPhySCP = +demoTarget.AvlPhySCP + +modifiedLand;
//                 targetCount.DistributedPhySCP = +demoTarget.DistributedPhySCP -  +modifiedLand 
//                 break
//             }
//             case 'ST': {
//                 if( data.landArea > demoTarget.AvlPhyTASP )
//                 return res.send({ message: "Invalid Target.Target exceeds the available target" })
//                 targetCount.AvlPhyTASP = +demoTarget.AvlPhyTASP + +modifiedLand;
//                 targetCount.DistributedPhyTASP = +demoTarget.DistributedPhyTASP - +modifiedLand 
//                 break
//             }
//         }
//         console.log("targetCount" , targetCount);
//         const updateDemonstrationTarget= {
//             AvlPhyGen : +targetCount.AvlPhyGen || 0 ,
//             AvlPhySCP : +targetCount.AvlPhySCP || 0 ,
//             AvlPhyTASP : +targetCount.AvlPhyTASP || 0 ,
//             DistributedPhyGen : +targetCount.DistributedPhyGen || 0,
//             DistributedPhySCP : +targetCount.DistributedPhySCP || 0,
//             DistributedPhyTASP : +targetCount.DistributedPhyTASP || 0
//         }
//         console.log(updateDemonstrationTarget);
//         console.log(requestIP.getClientIp(req));
//         // const farmerUpdateResult = await db.farmerPermit.update({LandArea : data.landArea , IPAddress : requestIP.getClientIp(req)}, { where : { Permit_NO : data.permit_NO ,FarmerId: data.farmerId , DemonstrationId: data.demonstrationId }})
//         // const updateDemoTarget = await db.DemonstrationPatch.update(updateDemonstrationTarget,{ where:{ DemostrationId: data.demonstrationId} })
//         // res.send({ message: "Farmer Land updated Successfully." })
//         // logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'Update', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

//     } catch (e) {
//         console.error(e);
//         next(createError.InternalServerError());
//         logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'Update', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

//     }
// }

exports.getCalculatedInputCost = async (req,res) => {
    try{
         const queryText1 = `SELECT a."schemeId", SUM(cast(a.totaleligiblesubsidy as numeric )) AS "subsidyReleased"
         FROM "PaymentMaster" a
         INNER JOIN "Farmer_Permit" b ON a."Permit_NO" = b."Permit_NO"
         WHERE a."TransId" IS NOT NULL AND b."Added_By" = '${req.payload.user_id}'
         GROUP BY a."schemeId"`
         const result = await db.sequelize.query(queryText1);
         res.send(result[0]);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getCalculatedIncentiveCost = async (req,res) => {
    try{
         const queryText1 = `SELECT a."schemeId",SUM(cast(a."totalEligibleIncentive" as numeric )) AS "subsidyReleased"
         FROM "InctvPaymentMaster" a
         INNER JOIN "Farmer_Permit" b ON a."Permit_NO" = b."Permit_NO"
         WHERE a."TransId" IS NOT NULL AND b."Added_By"='${req.payload.user_id}'
         GROUP BY a."schemeId"`
         const result = await db.sequelize.query(queryText1);
         res.send(result[0]);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}
