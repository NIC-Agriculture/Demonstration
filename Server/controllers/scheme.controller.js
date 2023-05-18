const { db , sequelize} = require('../config/config');
const UserModel = require('../models/User.model');
const logController = require('./log.controller');
const requestIP = require('request-ip');
const UAParser = require('ua-parser-js');
const parser = new UAParser();
const createError = require('http-errors');

exports.getCurrentFinYear = () => {
    return new Promise(resolve => {
        var year = new Date().getFullYear().toString();
        var month = new Date().getMonth();
        var finYear = month >= 3 ? year + "-" + (parseInt(year.slice(2, 4)) + 1).toString() : (parseInt(year) - 1).toString() + "-" + year.slice(2, 4);
        resolve(finYear);
    })
}

exports.getUserDetailsByUserId = (user_id) => {
    return new Promise( async (resolve, reject) => {
        try {
            let response = await UserModel.findOne({ where: { user_id: user_id}, raw: true });
            resolve(response);
        } catch (e) {
            reject(e);
        }
    })
}

exports.getAllDistrict = async (req,res) => {
    try{
        const AllDistrictData = await db.DistrictMaster.findAll({
              attributes: ["Dist_Code","Dist_Name"],
              raw: true
        });
        res.send(AllDistrictData);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }

} 

exports.getAllScheme = async (req,res) => {
    try{
        const SchemeData = await db.SchemeMaster.findAll({
              attributes: ["schemeId" , "schemeName"],
              raw: true
        });
        res.send(SchemeData);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }

}

exports.getAllSubscheme = async (req,res) => {
    try{
        const AllSubschemeData = await db.SubSchemeMaster.findAll({
            attributes : ["schemeId" , "SubschemeId" , "SubschemeName" , "Fin_Year",
            [db.sequelize.literal('"SchemeMasterModel"."schemeName"'), "schemeName"]],
            raw : true,
            include: [{
                model: db.SchemeMaster,
                attributes: []
            }]
        })
        res.send(AllSubschemeData)
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getAllComponent = async (req,res) => {
    try{
        const AllComponentData = await db.ComponentMaster.findAll({
            attributes : ["schemeId" , "SubschemeId" , "CompId" , "CompName" , "Fin_Year",
            [db.sequelize.literal('"SchemeMasterModel"."schemeName"'), "schemeName"],
            [db.sequelize.literal('"SubSchemeMasterModel"."SubschemeName"'), "SubschemeName"]
            ],
            raw : true,
            include: [
                {
                    model: db.SchemeMaster,
                    required: true
                    // attributes: []
                },
                {
                    model : db.SubSchemeMaster ,
                    required: true
                    // attributes: [],
                }
            ]
        })
        res.send(AllComponentData)
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getSubscheme = async (req,res) => {
    try{
        const SubschemeData = await db.SubSchemeMaster.findAll({
            attributes : ["SubschemeId", "SubschemeName"],
            where: { schemeId: req.query.schemeId },
            raw: true
        });
        res.send(SubschemeData);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getComponent = async (req,res) => {
    try{
        const ComponentData = await db.ComponentMaster.findAll({
            attributes : ["CompId" , "CompName"],
            where: { SubschemeId: req.query.SubschemeId , Active : 1},
            raw: true
        });
        res.send(ComponentData);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getComponentCost = async (req,res) => {
    try{
        const CompCostData = await db.ComponentCostMap.findOne({
            attributes : ["CompId", "Total_Cost"],
            where: { CompId: req.query.CompId },
            raw: true
        });
        res.send(CompCostData);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getAllCrops = async (req,res) => {
    try{
        const AllCropData = await db.CropMaster.findAll({
            attributes : ["CropId" , "CropName"],
            raw: true
        });
        res.send(AllCropData);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getCrops = async (req,res) => {
    try{
        const CropData = await db.SubSchemeCropMap.findAll({
            attributes : ["CropId" , "CropName"],
            where: { SubschemeId: req.query.SubschemeId },
            raw: true
        });
        res.send(CropData);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getAllSubCrops = async (req,res) => {
    try{
        const AllSubCropData = await db.SubCropMaster.findAll({
            attributes : ["CropId", "CropName" , "SubCropId" , "SubCropName"],
            raw: true
        });
        res.send(AllSubCropData);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getSubCrops = async (req,res) => {
    try{
        const SubCropData = await db.SubCropMaster.findAll({
            attributes : ["SubCropId" , "SubCropName"],
            where: { CropId : req.query.CropId },
            raw: true
        });
        res.send(SubCropData);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.addSubscheme = async (req, res , next) => {
    try{
        data = req.body;
        data.forEach(e => {
            e.schemeId = e.schemeName.schemeId
            e.IPAddress = requestIP.getClientIp(req)
        });
        SavedSchemeDetails = await db.SubSchemeMaster.bulkCreate(data);
        res.send(true);
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'Submit', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

    } catch (e) {
        console.error(e);
        next(createError.InternalServerError());
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'Submit', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

    }
    
}

exports.getAllComponentType = async (req, res , next) => {
    try{
        const ComponentTypeData = await db.ComponentTypeMaster.findAll({
            raw: true
        });
        res.send(ComponentTypeData);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.addComponent = async (req, res , next) => {
    const t = await db.sequelize.transaction();
    try{
        const data = req.body; 
        if(data.length == 0) return res.send({message : `Please enter valid data.`})
        for(let e of data) {
            const ComponentData = {};
            ComponentData.schemeId = e.schemeName.schemeId;
            ComponentData.SubschemeId = e.SubschemeName.SubschemeId;
            ComponentData.CompName = e.CompName;
            ComponentData.CompTypeId = e.componentType.CompTypeId;
            ComponentData.IPAddress = requestIP.getClientIp(req);
            ComponentData.Fin_Year = e.Fin_Year;
            ComponentData.Active = 1;
            
            let SavedComponentDetails = await db.ComponentMaster.create(ComponentData, { transaction: t });
            let CompId = SavedComponentDetails.CompId;
            let SubschemeId = SavedComponentDetails.SubschemeId
            let CompTypeId = SavedComponentDetails.CompTypeId
            e.CompId = SavedComponentDetails.CompId;

            const SavedComponentCostDetails = await db.ComponentCostMap.create(e, { transaction: t });
           
            if(e.Fixed_SubCrop.length != 0){
                    const cropData = []                
                    for (let i = 0; i < e.Fixed_SubCrop.length; i++) {
                        const element = e.Fixed_SubCrop[i];
                        const SubCropdata = {};
                    
                        SubCropdata.CompId = CompId;
                        SubCropdata.SubschemeId = SubschemeId;
                        SubCropdata.CompTypeId = CompTypeId;
                        SubCropdata.CropId = e.cropCategory.CropId;
                        SubCropdata.SubCropId = e.subCrop.SubCropId;
                        SubCropdata.AdditionalSubCropId = e.additionalSubCrop.SubCropId;
                        SubCropdata.FixedSubCropId = element.SubCropId;
                        SubCropdata.Added_By = req.payload.user_id;
                        SubCropdata.AddedOn = Date();
                        SubCropdata.IPAddress = requestIP.getClientIp(req)
                        cropData.push(SubCropdata)
                    }
                    const SavedCropList = await db.ComponentCropMapping.bulkCreate(cropData, { transaction: t });
                
            }else {
                        const SubCropdata = {};
                        SubCropdata.CompId = CompId;
                        SubCropdata.SubschemeId = SubschemeId;
                        SubCropdata.CompTypeId = CompTypeId;
                        SubCropdata.CropId = e.cropCategory.CropId;
                        SubCropdata.SubCropId = e.subCrop.SubCropId;
                        SubCropdata.AdditionalSubCropId = '';
                        SubCropdata.FixedSubCropId = '';
                        SubCropdata.Added_By = req.payload.user_id;
                        SubCropdata.AddedOn = Date();
                        SubCropdata.IPAddress = requestIP.getClientIp(req);
                        const SavedCropList = await db.ComponentCropMapping.create(SubCropdata, { transaction: t });
             }
        }
         
        res.send({message : `Component Details added successfully.`});
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'Submit', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

        await t.commit();
    } catch (e) {
        await t.rollback();
        console.error(e);
        next(createError.InternalServerError());
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'Submit', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

    }
    
}

exports.addCompItemDetails = async (req, res , next) => {
    const t = await db.sequelize.transaction();
    try{
        const data = req.body; 
        for(let e of data) {
            const SavedItem = await db.ItemMaster.create(e, { transaction: t });
            e.ItemId = SavedItem.ItemId;
            e.IPAddress = requestIP.getClientIp(req)
            const SavedItemPackageDetails = await db.itemPriceDetails.create(e , { transaction: t });
         }
          res.send(true);
          logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'Submit', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

          await t.commit();
    } catch (e) {
        await t.rollback();
        console.error(e);
        next(createError.InternalServerError());
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'Submit', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

    }
    
}

exports.addItemTechDetails = async (req,res,next) => {
    try {
        const data = req.body;
        // console.log(data); 
    } catch (e) {
        console.error(e);
        next(createError.InternalServerError());
        
    }
}


exports.getAllDistrictTarget = async (req, res) => {
    try{
        const queryText = `SELECT "Dist_Code", "DtargetId","PhyGen", "PhySCP", "PhyTASP","AvlPhyGen" as avl_PhyGen, 
        "AvlPhySCP" as avl_PhySCP, "AvlPhyTASP" as avl_PhyTASP , 
        "DistributedPhyGen" , "DistributedPhySCP" , "DistributedPhyTASP",
        (coalesce("TotalPhyGen",0) + coalesce("TotalPhySCP",0) + coalesce("TotalPhyTASP",0)) AS "totalTarget",
        (coalesce("DistributedPhyGen",0) + coalesce("DistributedPhySCP",0) + coalesce("DistributedPhyTASP",0)) AS "totalDistributedTarget"
        FROM "DistrictTarget"
        WHERE "SubschemeId" = '${req.query.SubschemeId}' AND "CompId" = '${req.query.CompId}' AND "Fin_Year" = '${req.query.Fin_Year}'`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);  
    }catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }

}

exports.SubmitDistrictTarget = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
       const data = req.body;
       AllDistrictTarget = data.ditrictTarget.map(e => {
        e.schemeId= data.InputCompDetails.schemeId ,
        e.SubschemeId = data.InputCompDetails.SubschemeId ,
        e.CompId = data.InputCompDetails.CompId ,
        e.Total_Cost = data.InputCompDetails.Total_Cost ,
        e.Fin_Year = data.InputCompDetails.Fin_Year,
        e.Added_By = req.payload.userName,
        e.AddedOn = `${Date()}`,
        e.IPAddress = requestIP.getClientIp(req)
        return e
       })

        const existingResult = await db.districtTarget.findAll({
            where: {CompId: data.InputCompDetails.CompId , Fin_Year : data.InputCompDetails.Fin_Year },
            raw:true
        })
        AllDistrictTarget.forEach(async(e) => {
            if(existingResult.length > 0){
                const exData = existingResult[existingResult.findIndex(ele => e.Dist_Code == ele.Dist_Code && e.CompId == ele.CompId && e.Fin_Year == ele.Fin_Year)]
                if(!exData){
                    e.AvlPhyGen = +e.PhyGen||0;
                    e.AvlPhySCP = +e.PhySCP||0;
                    e.AvlPhyTASP =  +e.PhyTASP||0;
                    e.TotalPhyGen = +e.PhyGen||0;
                    e.TotalPhySCP = +e.PhySCP||0;
                    e.TotalPhyTASP = +e.PhyTASP||0;
                }else{
                    e.AvlPhyGen = +exData.AvlPhyGen||0 + +e.PhyGen||0;
                    e.AvlPhySCP = +exData.AvlPhySCP||0 + +e.PhySCP||0;
                    e.AvlPhyTASP = +exData.AvlPhyTASP||0 + +e.PhyTASP||0;
                    e.TotalPhyGen = +exData.TotalPhyGen||0 + +e.PhyGen||0;
                    e.TotalPhySCP = +exData.TotalPhySCP||0 + +e.PhySCP||0;
                    e.TotalPhyTASP = +exData.TotalPhyTASP||0 + +e.PhyTASP||0;
             }
            }else{
                e.AvlPhyGen = +e.PhyGen || 0;
                e.AvlPhySCP = +e.PhySCP || 0;
                e.AvlPhyTASP =  +e.PhyTASP || 0;
                e.TotalPhyGen = +e.PhyGen || 0;
                e.TotalPhySCP = +e.PhySCP || 0;
                e.TotalPhyTASP = +e.PhyTASP || 0;

            }            
        });

        DistrictTargetResult = await db.districtTarget.bulkCreate(AllDistrictTarget, {transaction: t});
        res.send({message:"Target Added Successfully."})
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'Submit', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

        await t.commit();
    } catch (e) {
        await t.rollback();
        console.error(e);
        next(createError.InternalServerError());
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'Submit', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    }
}

exports.UpdateDistrictTarget = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        
        const data = req.body
        const t = await sequelize.transaction();
        const existingResult = await db.districtTarget.findAll({
             where: {CompId: data[0].CompId , Fin_Year : data[0].Fin_Year },
             raw:true
             })
        
        const promiseArray = []
        
        data.forEach(e => {
                const exData = existingResult[existingResult.findIndex(ele => e.Dist_Code == ele.Dist_Code && e.CompId == ele.CompId && e.Fin_Year == ele.Fin_Year)]
        
                e.Added_By = req.payload.user_id
                e.AvlPhyGen = +exData.AvlPhyGen + (+e.modifiedPhyGen || 0)
                e.AvlPhySCP = +exData.AvlPhySCP + (+e.modifiedPhySCP || 0)
                e.AvlPhyTASP = +exData.AvlPhyTASP + (+e.modifiedPhyTASP || 0)
                
                e.TotalPhyGen = (+exData.TotalPhyGen || 0) + (+e.modifiedPhyGen || 0)
                e.TotalPhySCP = (+exData.TotalPhySCP || 0) + (+e.modifiedPhySCP || 0)
                e.TotalPhyTASP = (+exData.TotalPhyTASP || 0) + (+e.modifiedPhyTASP || 0)

                e.PhyGen = e.modifiedPhyGen ? +e.modifiedPhyGen : +exData.PhyGen
                e.PhySCP = e.modifiedPhySCP ? +e.modifiedPhySCP : +exData.PhySCP
                e.PhyTASP = e.modifiedPhyTASP ? +e.modifiedPhyTASP : +exData.PhyTASP
                e.IPAddress = requestIP.getClientIp(req)
                
                const udpateData = db.districtTarget.update(e, { where: {  Dist_Code: e.Dist_Code , CompId: e.CompId , Fin_Year : e.Fin_Year } , transaction: t})
                promiseArray.push(udpateData)
        })
        const result = await Promise.all(promiseArray)
        res.send({message : "Data updated successfully"})
        logController.addAuditLog(req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift() , 'Update', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
        await t.commit();
        // END Transaction, COMMIT Transaction
    } catch(e) {
        // END Transacion: ROLLBACK Transaction, (it is called when some errors are occured)
        await t.rollback();
        console.error(e);
        next(createError.InternalServerError());
        logController.addAuditLog(req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift() , 'Update', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    }
   
}



exports.getDemonstrationIdCount = async (req,res) => {
    try {
        const queryText = `SELECT COUNT(DISTINCT(a."DemostrationId")) as TotalDemonstrationId ,COUNT(b."FarmerId") as TotalFarmer,
        SUM(CASE WHEN b."Farmer_Category"  = 'General' THEN 1 ELSE 0 END) as "GenFarmer",SUM(CASE WHEN b."Farmer_Category"  = 'SC' THEN 1 ELSE 0 END) as "SCFarmer",
        SUM(CASE WHEN b."Farmer_Category"  = 'ST' THEN 1 ELSE 0 END) as "STFarmer"
        FROM "DemonstrationPatchMaster" a
        LEFT JOIN "Farmer_Permit" b ON b."DemonstrationId" = a."DemostrationId";`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e); 
    }
}

exports.getBlockTarget = async (req,res) => {
    try {
        const queryText = `SELECT b."Block_Name" ,a."TotalPhyGen",a."TotalPhySCP",a."TotalPhyTASP",
        a."DistributedPhyGen",a."DistributedPhySCP",a."DistributedPhyTASP",
        a."AvlPhyGen",a."AvlPhySCP",a."AvlPhyTASP",
		a."TotalPhyGen" + a."TotalPhySCP" + a."TotalPhyTASP" as "TotalTarget",
		a."DistributedPhyGen" + a."DistributedPhySCP" + a."DistributedPhyTASP" as "TotalDistributedTarget",
		a."AvlPhyGen" + a."AvlPhySCP" + a."AvlPhyTASP" as "TotalAvailableTarget"
        FROM "BlockTarget" a
        INNER JOIN  "LGBlocks" b ON a."Block_Code" = b."Block_Code"
        WHERE a."Dist_Code" = '${req.query.Dist_Code}' AND a."CompId" = '${req.query.CompId}' AND a."Fin_Year"='${req.query.FinYear}';`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e); 
    }
}

exports.getBlocks = async (req,res) => {
    try{
        const BlockData = await db.BlockMaster.findAll({
            attributes : ["Block_Code", "Block_Name"],
            where: { Dist_Code: `${req.query.Dist_Code}` },
            raw: true
        });
        res.send(BlockData);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}




exports.getclusterDemonstration = async (req,res) => {
    try{
        if(req.query.Block_Code ==''){
            req.query.Block_Code = 0 
        }
        if(req.query.CompId == ''){
            req.query.CompId = 0
        }
        const queryText = `SELECT d."Block_Name" , a."DemostrationId",a."Gp_Code",a."lgd_wardcode",a."vaw_userId", SUM(CASE WHEN c."Farmer_Category"  = 'General' THEN 1 ELSE 0 END) as "GenFarmer",
           SUM(CASE WHEN c."Farmer_Category"  = 'SC' THEN 1 ELSE 0 END) as "SCFarmer", SUM(CASE WHEN c."Farmer_Category"  = 'ST' THEN 1 ELSE 0 END) as "STFarmer",
           b."CompName",a."PhyGen", a."PhySCP", a."PhyTasp", a."AvlPhyGen", a."AvlPhySCP", a."AvlPhyTASP" 
           FROM "DemonstrationPatchMaster" a
           INNER JOIN "ComponentMaster" b ON a."CompId" = b."CompId"
           INNER JOIN "LGBlocks" d ON a."Block_Code" = d."Block_Code"
           LEFT JOIN "Farmer_Permit" c ON a."DemostrationId" = c."DemonstrationId"
           WHERE a."Dist_Code"='${req.query.Dist_Code}' AND (a."Block_Code" = '${req.query.Block_Code}' or '${req.query.Block_Code}'='0') AND (a."CompId"='${req.query.CompId}' or '${req.query.CompId}'='0')  
           AND a."Fin_Year"='${req.query.Fin_Year}'                   
           GROUP BY d."Block_Name" ,a."DemostrationId", a."Gp_Code",a."lgd_wardcode",a."vaw_userId",
           b."CompName",a."PhyGen", a."PhySCP", a."PhyTasp",a."AvlPhyGen", a."AvlPhySCP", a."AvlPhyTASP";`
           
        const result = await db.sequelize.query(queryText);
        const GpData = []
        result[0].forEach(async(e, key) => {
            if (e.Gp_Code != null) {
                var GPCode = e.Gp_Code.split(',')
                GPCode.forEach(async(y, key1) => {
                    const queryText1 = `SELECT "Gp_Code" , "Gp_Name" FROM "LGGP" WHERE "Gp_Code" = '${y}';`
                    const result1 = await db.sequelize.query(queryText1);
                    result1[0][0].DemostrationId = e.DemostrationId;
                    GpData.push(result1[0][0]);
                    if(key+1==result[0].length){
                        if (key1+1==GPCode.length) {
                            res.send({result:result[0],GpData:GpData});
                        }
                    }
                    
                });
            }
        })
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}


exports.getWardData = async (req,res) => {
    try{
         const queryText1 = `select "WardCode","WardName" from "WardMaster" where "WardCode" = '${req.query.WardCode}';`
         const result = await db.sequelize.query(queryText1);
         result[0][0].DemostrationId = req.query.DemostrationId;
         res.send(result[0]);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getCalculatedInputCost = async (req,res) => {
    try{
         const queryText1 = `SELECT a."schemeId",SUM(cast(a.totaleligiblesubsidy as numeric )) AS "subsidyReleased"
         FROM "PaymentMaster" a
         WHERE a."TransId" IS NOT NULL
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
         WHERE a."TransId" IS NOT NULL
         GROUP BY a."schemeId"`
         const result = await db.sequelize.query(queryText1);
         res.send(result[0]);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getItemDetails = async (req,res) => {
    try{
         const queryText1 = `select a."ItemId",a."ItemName",b."IndicativeCost",c."CompName" 
         from "ItemMaster" a
         INNER JOIN "itemPackageMaster" b ON a."ItemId" = b."ItemId"
         INNER JOIN "ComponentMaster" c ON a."CompId" = c."CompId"
         Where a."CompId" = '${req.query.CompId}'`
         const result = await db.sequelize.query(queryText1);
         res.send(result[0]);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}