const Sequelize = require('sequelize');
var sql = require("mssql");

const { db , sequelize } = require('../config/config');
const UserModel = require('../models/User.model');
const logController = require('./log.controller');
const request = require('request')
const requestIP = require('request-ip');
const UAParser = require('ua-parser-js');
const parser = new UAParser();
const createError = require('http-errors');


const farmerDBSequelize = new Sequelize('FARMERDB', 'farmer', 'faRmeR@DB@13', {
    // host: '164.100.140.101',
    host: '10.172.0.101',
    dialect: 'mssql'
});

const locConfig1 = {
    user: 'farmer',
    password: 'faRmeR@DB@13',
    // server: '164.100.140.101',
    server: '10.172.0.101',
    database: 'FARMERDB',
    requestTimeout: 3600000
};

const epestSequelize = new Sequelize('e-pest', 'epest', 'E@Pest#456', {
    // host: '164.100.140.101',
    host: '10.172.0.101',
    dialect: 'mssql'
});

const locConfig = {
    user: 'epest',
    password: 'E@Pest#456',
    // server: '164.100.140.101',
    server: '10.172.0.101',
    database: 'e-pest',
    requestTimeout: 3600000
};





exports.getUserDetailsByUserId = async(user_id) => {
    return new Promise( async (resolve, reject) => {
        try { 
            const queryText = `SELECT 
            a."role" ,
            a."userName" , 
            a."password" , 
            b."BAOUserID", 
            b."Block_Code",
            b."CDAOUserID",
            c."Dist_Code"
            FROM "users1" a 
            INNER JOIN "BAOMaster" b 
            ON a."user_id" = b."BAOUserID"
            INNER JOIN "CDAOMaster" c 
            ON b."CDAOUserID" = c."CDAOUserID"
            WHERE a."user_id" = '${user_id}';`
            const result = await db.sequelize.query(queryText);
            resolve(result[0][0])
        }catch (e){
            reject(e)
            }
      })
    
}

exports.getGPs = async (req,res) => {
    try{
            var wardData = []

            const queryText = `SELECT * FROM "LGUlb" WHERE "Block_Code" = '${req.payload.Block_Code}' `
            const uldData = await sequelize.query(queryText);
            // console.log("uldData", uldData[0]);

            const queryText1 = `SELECT "Gp_Code" , "Gp_Name" FROM "LGGP" WHERE "Block_Code" = '${req.payload.Block_Code}' `
            const GPList = await sequelize.query(queryText1);
            
            if(uldData[0].length == 0) return res.send({GPdata : GPList[0] , wardData: [] });

            uldData[0].forEach(async(e , key) => {
                    // console.log("for loop");
                    const queryText = `SELECT u.UlbCode, u.WardName, a.lgd_wardcode,a.pds_gpid,
                    b.lg_gpCode ,
                    wardStatus = 'ward' FROM FARMERDB.dbo.WardVillagemap a
                    INNER JOIN FARMERDB.dbo.Ward_Master u ON a.lgd_wardcode=u.WardCode
                    INNER JOIN FARMERDB.dbo.GpMap b ON a.pds_gpid=b.int_gpid
                    where u.UlbCode='${e.ULB_Code}' `
                    result = await farmerDBSequelize.query(queryText);
                    wardData = [...wardData, ...result[0]]
                    // console.log("result", result[0]);

                    if(key+1 == uldData[0].length) {
    
                        res.send({GPdata : GPList[0] , wardData: wardData });
    
                    }
            })

    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.assignVAW = async (req,res) => {
    try{
         const queryText = `SELECT a.VAWCode as VAWCode , a.VAWName as VAWName , a.VAWMobileNo as VAWMobileNo , a.GPCode, b.GPName AS GP_Name
         FROM VAWGPMapping a 
         INNER JOIN LGDGP b ON a.GPCode = b.GPCode
         WHERE a.GPCode = '${req.query.Gp_Code}' AND a.Status = 1`
         const result = await epestSequelize.query(queryText);
         res.send(result[0]);
               
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getAllScheme = async (req,res) => {
    try{
        const queryText = `SELECT * FROM "SchemeMaster"`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getSubscheme = async (req,res) => {
    try{
        const queryText = `SELECT "SubschemeId","SubschemeName" , "Demonstration_Area" FROM "SubSchemeMaster" WHERE "schemeId" = '${req.query.schemeId}';`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);  
    }catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getComponent = async (req,res) => {
    try{
        const queryText = `SELECT "CompId","CompName","CompTypeId" FROM "ComponentMaster" WHERE "SubschemeId" = '${req.query.SubschemeId}' AND "Active" = 1;`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    }catch(e){
        res.status(500).send('Unexpected error');
        console.error(e);

    }
}

exports.getBlockTarget = async(req,res) => {
        try {
            // console.log(req.payload.Dist_Code);
            const BlockTarget = await db.blockTarget.findOne({
                where: {
                        schemeId: req.query.schemeId,
                        SubschemeId: req.query.SubschemeId,
                        CompId: req.query.CompId,
                        Fin_Year: req.query.Fin_Year,
                        Block_Code : req.payload.Block_Code
                     },
                raw: true
            })
            
            res.send(BlockTarget)
        } catch (e) {
            res.status(500).send('Unexpected error')
            console.error(e);
        }
}

exports.getDemonstrationData = async (req, res) => {
    try {
        const queryText = `SELECT a.* , ddd."schemeName" , dd."SubschemeName" , b."SubCropName" , c."Variety_Name" , bb."SubCropName" AS bpSubCropName ,
        cc."Variety_Name" AS bpCropVariety, d."CompName"
        FROM "DemonstrationPatchMaster" a
        LEFT JOIN "SubCropMaster" b ON a."SubCropId" = b."SubCropId"
        LEFT JOIN "CropVarietyMaster" c ON a."Variety_Code" = c."Variety_Code"
        INNER JOIN "ComponentMaster" d ON a."CompId" = d."CompId"
        INNER JOIN "SubSchemeMaster" dd ON dd."SubschemeId" = d."SubschemeId"
        INNER JOIN "SchemeMaster" ddd ON ddd."schemeId" = d."schemeId"
        LEFT JOIN "SubCropMaster" bb ON a."BP_SubCropId" = bb."SubCropId"
        LEFT JOIN "CropVarietyMaster" cc ON a."BP_Variety_Code" = cc."Variety_Code"
        WHERE a."Block_Code"='${req.payload.Block_Code}'`
        // console.log(queryText);
        const result = await db.sequelize.query(queryText);
        // console.log(result[0]);
        res.send(result[0]);
    } catch (e) {
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}

exports.getVerifiedDemonstrationData = async (req, res) => {
    try {
        const queryText = `SELECT a.* , ddd."schemeName" , dd."SubschemeName" , b."SubCropName" , c."Variety_Name" , bb."SubCropName" AS bpSubCropName ,
        cc."Variety_Name" AS bpCropVariety, d."CompName"
        FROM "DemonstrationPatchMaster" a
        LEFT JOIN "SubCropMaster" b ON a."SubCropId" = b."SubCropId"
        LEFT JOIN "CropVarietyMaster" c ON a."Variety_Code" = c."Variety_Code"
        INNER JOIN "ComponentMaster" d ON a."CompId" = d."CompId"
        INNER JOIN "SubSchemeMaster" dd ON dd."SubschemeId" = d."SubschemeId"
        INNER JOIN "SchemeMaster" ddd ON ddd."schemeId" = d."schemeId"
        LEFT JOIN "SubCropMaster" bb ON a."BP_SubCropId" = bb."SubCropId"
        LEFT JOIN "CropVarietyMaster" cc ON a."BP_Variety_Code" = cc."Variety_Code"
        WHERE a."Block_Code"='${req.payload.Block_Code}' AND a."ConfirmBy_vaw" = '1' AND a."ConfirmBy_BAO" = '1'`
        const result = await db.sequelize.query(queryText);
        // console.log(result[0]);
        res.send(result[0]);
    } catch (e) {
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}

exports.getItemDetails = async (req, res , next) => {
    try {
        const queryText = `SELECT * FROM "itemPackageMaster" WHERE "ItemId" = '${req.query.bp_ItemId}';`
        const result = await db.sequelize.query(queryText);
        // console.log(result);
        res.send(result[0][0]);
    } catch (e) {
        console.error(e);
        next(createError.InternalServerError());

    }
}

exports.getAllFarmerList = async (req, res , next) => {
    try {        
        const queryText = `SELECT * FROM public."Farmer_Permit" WHERE "DemonstrationId" = '${req.query.DemonstrationId}';`
        const result = await db.sequelize.query(queryText);
        res.send(result[0])        
    } catch (e) {
        console.error(e);
        next(createError.InternalServerError());

    }
}

exports.SubmitDemonstrationPatch = async (req, res , next) => {
    const t = await sequelize.transaction();
    try { 
            const data = req.body.gpTarget
            
            const gpCode = req.body.gpList.map(e =>{
                    return e.Gp_Code;
            });
            const wardCode = req.body.wardList.map(e => {
                    return e.lgd_wardcode
            })
            
            data.PhyTasp = data.PhyTASP
            data.Dist_Code = req.payload.Dist_Code
            data.Block_Code = req.payload.Block_Code
            data.Gp_Code = gpCode.toString()
            data.lgd_wardcode = wardCode.toString()
            data.vaw_userId = req.body.vawDetails.VAWCode
            data.vaw_GpCode = req.body.vawDetails.GPCode
            data.SeedDistributionStatus = 'Pending'
            data.updatedAt = Date()
            data.Added_By = req.payload.user_id
            data.IPAddress = req.socket.remoteAddress;
            data.AddedOn = Date()
            data.IPAddress = req.socket.remoteAddress
            data.AvlPhyGen = +data.PhyGen || 0;
            data.AvlPhySCP = +data.PhySCP || 0;
            data.AvlPhyTASP =  +data.PhyTASP || 0;
            data.TotalPhyGen = +data.PhyGen || 0;
            data.TotalPhySCP = +data.PhySCP || 0;
            data.TotalPhyTASP = +data.PhyTASP || 0;

            if((+data.PhyGen + +data.PhySCP + +data.PhyTASP ) > 100 && (+data.PhyGen + +data.PhySCP + +data.PhyTASP ) < 100 )
            return res.send({ message: "Invalid Target.Target should neither exceed 100 ha. nor below 100 ha." })

            const blockTarget = await db.blockTarget.findOne({ where: {Dist_Code: `${req.payload.Dist_Code}`, Block_Code: req.payload.Block_Code , CompId: data.CompId}, raw:true })
            
            if(+data.AvlPhyGen > +blockTarget.AvlPhyGen || +data.AvlPhySCP > +blockTarget.AvlPhySCP || +data.AvlPhyTASP > +blockTarget.AvlPhyTASP)
            return res.send({ message: "Invalid Target.Target exceeds the available target" })

            const updateBlockData = {
                AvlPhyGen : (+blockTarget.AvlPhyGen - data.AvlPhyGen).toFixed(1),
                AvlPhySCP : (+blockTarget.AvlPhySCP - data.AvlPhySCP).toFixed(1),
                AvlPhyTASP :( +blockTarget.AvlPhyTASP - data.AvlPhyTASP).toFixed(1),
                DistributedPhyGen : (+blockTarget.DistributedPhyGen + data.AvlPhyGen).toFixed(1),
                DistributedPhySCP : (+blockTarget.DistributedPhySCP + data.AvlPhySCP).toFixed(1),
                DistributedPhyTASP :( +blockTarget.DistributedPhyTASP + data.AvlPhyTASP).toFixed(1)
            }

            const result = await db.DemonstrationPatch.create(data, { transaction: t })
            const updateBlockTarget = await db.blockTarget.update(updateBlockData,{ where: {  Dist_Code: req.payload.Dist_Code, Block_Code: req.payload.Block_Code, CompId: data.CompId } , transaction: t})
            // console.log(result);
            res.send({message:`Demonstration Patch created Successfully. Demonstration ID is '${result.DemostrationId} '`})
            logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'Submit', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    
            await t.commit();
        
    } catch (e) {
        await t.rollback();
        console.error(e);
        next(createError.InternalServerError());
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'Submit', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    }
}

// exports.confirmDemonstrationPatch = async (req, res, next) => {
//     try {
//         confirmStatusByBAO = await db.DemonstrationPatch.update({ ConfirmBy_BAO : 1 },{ where: { DemostrationId: req.query.DemonstrationId , ConfirmBy_vaw : 1 } })
//         res.send({message:"Successfully Confirmed."})
//         logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'Update', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
//     } catch (e) {
//         console.log(e);
//         next(createError.InternalServerError())
//         logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'Update', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
//     }
// }

exports.confirmDemonstrationPatch = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        confirmStatusByBAO = await db.DemonstrationPatch.update({ ConfirmBy_BAO : 1 },{ where: { DemostrationId: req.query.DemonstrationId , ConfirmBy_vaw : 1 } , transaction: t })
        farmerListByDemoID = await db.farmerPermit.findAll({
            raw: true,
            where: { DemonstrationId: req.query.DemonstrationId }, transaction: t
        })

        farmerListByDemoID.forEach(e => {
            var sms = `Your Permit no '${e.Permit_NO}' is now eligible to purchase the Items. DAFP AGRIOR`;
            // var mobileNo = 7978565520
            var mobileNo = e.MobileNo
            request(`http://mkuy.apicol.nic.in/Registration/EPestSMSNew?template_id=1107165632277130779&type=SMS&mobileNo=${mobileNo}&sms=${sms}`, {
              json: true
            }, (err, resp, body) => {
              if (err) {
                console.log(err);
              } 
            });
         });

        res.send({message:"Successfully Confirmed."})
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'Update', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
        await t.commit();
    } catch (e) {
        await t.rollback();
        console.log(e);
        next(createError.InternalServerError())
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'Update', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    }
}

exports.getAllDealerSale = async (req, res, next) => {
    try {
        const queryText = `SELECT a."InvoiceNo", a."DemonstrationId" , a."Permit_NO" , a."FarmerId" , a."Farmer_Category" ,
        a."dealerLiscenseNo", a."SoldBy" , a."SoldOn" , a."FarmerName",
        SUM(cast(a."totalPrice" as int)) AS TotalSalePrice , 
        SUM(cast(a."eligibleSubsidy" as int)) AS TotalEligibleSubsidy 
        From "DealerSale" a where "DemonstrationId" = '${req.query.DemonstrationId}' and "verifyStatus" = 'NotVerified'
        GROUP BY a."InvoiceNo", a."DemonstrationId" , a."Permit_NO" ,  a."FarmerId" , a."Farmer_Category",a."dealerLiscenseNo",
        a."SoldBy" , a."SoldOn" , a."FarmerName"`
        const result = await db.sequelize.query(queryText);
        // console.log(result);
        res.send(result[0]);
    } catch (e) {
        console.log(e);
        next(createError.InternalServerError())
    }
}

exports.getDealerSaleReciept = async (req, res, next) => {
    try {
        const dealerSaleRecieptResult = await db.dealerSale.findAll({
            where: { InvoiceNo : req.query.InvoiceNo },
            raw: true
        });
        
        res.send(dealerSaleRecieptResult)
    } catch (e) {
        console.log(e);
        next(createError.InternalServerError())
    }
}

exports.getVAWSaleReciept = async (req, res, next) => {
    try {
        const vawSaleRecieptResult = await db.farmerPermit.findOne({
            where: { Permit_NO : req.query.Permit_NO },
            raw: true
        });
        
        res.send(vawSaleRecieptResult)
    } catch (e) {
        console.log(e);
        next(createError.InternalServerError())
    }
}

exports.confirmDealerSale = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const data = req.body
        const promiseArray = []
        const BAOdata = data.map(e => {
                        return{
                            InvoiceNo : e.InvoiceNo,
                            baoAction : 'Confirmed',
                            bao_UserId : req.payload.user_id,
                            baoTime : Date(),
                            baoIp : req.socket.remoteAddress
                          }
                      });
        const result = await db.dealerSaleAction.bulkCreate(BAOdata , { transaction: t })
        BAOdata.forEach(e => {
            const udpateData = db.dealerSale.update( {verifyStatus:'Verifying'} , { where: { InvoiceNo: e.InvoiceNo } , transaction: t})
            promiseArray.push(udpateData)
        });
       
        const result3 = await Promise.all(promiseArray)
        res.send({message:"Successfully Forwarded to CDAO."})
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'Update', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

        await t.commit();
    } catch (e) {
        await t.rollback();
        console.error(e);
        next(createError.InternalServerError());
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'Update', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    }
}

exports.getAvailableTarget = async (req,res) => {
    try{
        const queryText = `SELECT b."schemeName", c."SubschemeName", d."CompName",a."TotalPhyGen" + a."TotalPhySCP" + a."TotalPhyTASP" as "TotalTarget" ,a."AvlPhyGen" + a."AvlPhySCP" + a."AvlPhyTASP" 
        as "TotalAvlTarget", a."DistributedPhyGen" + a."DistributedPhySCP" + a."DistributedPhyTASP" as "TotalDistributedTarget" from "BlockTarget" a
        INNER JOIN "SchemeMaster" b ON a."schemeId" = b."schemeId"
        INNER JOIN "SubSchemeMaster" c ON a."SubschemeId" = c."SubschemeId"
        INNER JOIN "ComponentMaster" d ON a."CompId" = d."CompId"
        where a."Block_Code" = '${req.payload.Block_Code}' AND a."Fin_Year" = '${req.query.Fin_Year}' AND a."schemeId" = '${req.query.schemeId}' `
        // console.log(queryText);
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getclusterDemonstration = async (req,res) => {
    try{
        const queryText = `SELECT a."DemostrationId",a."Gp_Code",a."lgd_wardcode",a."vaw_userId", SUM(CASE WHEN c."Farmer_Category"  = 'General' THEN 1 ELSE 0 END) as "GenFarmer",
        SUM(CASE WHEN c."Farmer_Category"  = 'SC' THEN 1 ELSE 0 END) as "SCFarmer", SUM(CASE WHEN c."Farmer_Category"  = 'ST' THEN 1 ELSE 0 END) as "STFarmer",
        b."CompName",a."PhyGen", a."PhySCP", a."PhyTasp", a."AvlPhyGen", a."AvlPhySCP", a."AvlPhyTASP" 
        FROM "DemonstrationPatchMaster" a
        INNER JOIN "ComponentMaster" b ON a."CompId" = b."CompId"
        LEFT JOIN "Farmer_Permit" c ON a."DemostrationId" = c."DemonstrationId"
        WHERE a."Block_Code" = '${req.payload.Block_Code}' AND a."Fin_Year" = '${req.query.Fin_Year}' AND a."schemeId" = '${req.query.schemeId}' 
        group by a."DemostrationId",a."Gp_Code",a."lgd_wardcode",a."vaw_userId",
        b."CompName",a."PhyGen", a."PhySCP", a."PhyTasp",a."AvlPhyGen", a."AvlPhySCP", a."AvlPhyTASP";`
        console.log(queryText);
        const result = await db.sequelize.query(queryText);
        console.log(result[0]);
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
         const queryText1 = `SELECT "WardCode","WardName" FROM "WardMaster" WHERE "WardCode" = '${req.query.WardCode}';`
         const result = await db.sequelize.query(queryText1);
         result[0][0].DemostrationId = req.query.DemostrationId;
         res.send(result[0]);
                   
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getDemonstrationIdCount = async (req,res) => {
    try {
        const queryText = `SELECT COUNT(DISTINCT(a."DemostrationId")) as TotalDemonstrationId ,COUNT(DISTINCT(b."FarmerId")) as TotalFarmer,
        SUM(CASE WHEN b."Farmer_Category"  = 'General' THEN 1 ELSE 0 END) as "GenFarmer",SUM(CASE WHEN b."Farmer_Category"  = 'SC' THEN 1 ELSE 0 END) as "SCFarmer",
        SUM(CASE WHEN b."Farmer_Category"  = 'ST' THEN 1 ELSE 0 END) as "STFarmer"
        FROM "DemonstrationPatchMaster" a
        LEFT JOIN "Farmer_Permit" b ON b."DemonstrationId" = a."DemostrationId"
        WHERE a."Block_Code" = '${req.payload.Block_Code}';`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e); 
    }
}

exports.getSeedDistributionStatus = async (req,res) => {
    try {
        const queryText = `SELECT a."DemostrationId", b."statusPhase1", b."statusPhase2" , b."statusPhase3" from "DemonstrationPatchMaster" a 
        INNER JOIN "FarmerLandDetails" b ON a."DemostrationId" = b."DemostrationId";`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e); 
    }
}

exports.returnBackToVAW = async (req, res , next) => {
    const t = await sequelize.transaction();
    try {
        data = req.body[0]
        const promiseArray = []
        const promiseArray1 = []
        data.forEach(e => {
            farmerDetails = db.farmerPermit.update({ Status : 0 , IPAddress : req.socket.remoteAddress },{ where: { FarmerId: e.FarmerId , Permit_NO : e.Permit_NO, DemonstrationId: e.DemonstrationId }, transaction: t });
            promiseArray.push(farmerDetails)
        });
        const result = await Promise.all(promiseArray)
        data.forEach(e => {
            confirmStatusByVAW = db.DemonstrationPatch.update({ ConfirmBy_vaw : null },{ where: { DemostrationId: e.DemonstrationId }, transaction: t });
            promiseArray1.push(confirmStatusByVAW)
        });
        const result1 = await Promise.all(promiseArray1)
        res.send({message : "Return Back To VAW Successfully."})
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'Submit', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

        await t.commit();
    } catch (e) {
        await t.rollback();
        console.log(e);
        next(createError.InternalServerError())
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'Submit', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

    }
}

exports.deleteDemoID = async (req, res , next) => {
    const t = await sequelize.transaction();
    try {
        const queryText = `SELECT * FROM "DemonstrationPatchMaster" WHERE "DemostrationId" = '${req.query.DemostrationId}'`
        const demoTarget = await db.sequelize.query(queryText);

        if(+demoTarget[0][0].AvlPhyGen != +demoTarget[0][0].TotalPhyGen || +demoTarget[0][0].AvlPhySCP != +demoTarget[0][0].TotalPhySCP || +demoTarget[0][0].AvlPhyTASP != +demoTarget[0][0].TotalPhyTASP ) 
        return res.send({message : `${req.query.DemostrationId} can't be deleted.` , type: 'warning'} )

        const queryText1 = `SELECT * FROM "BlockTarget" WHERE "Block_Code" = '${demoTarget[0][0].Block_Code}' AND "SubschemeId" = '${demoTarget[0][0].SubschemeId}' AND "CompId" = '${demoTarget[0][0].CompId}' `
        const blockTarget = await db.sequelize.query(queryText1);
        // console.log("block",blockTarget[0][0]);

        const updateBlockData = {
            AvlPhyGen: +blockTarget[0][0].AvlPhyGen + +demoTarget[0][0].AvlPhyGen,
            AvlPhySCP:  +blockTarget[0][0].AvlPhySCP + +demoTarget[0][0].AvlPhySCP,
            AvlPhyTASP:  +blockTarget[0][0].AvlPhyTASP + +demoTarget[0][0].AvlPhyTASP,
            DistributedPhyGen:  +blockTarget[0][0].DistributedPhyGen - +demoTarget[0][0].AvlPhyGen,
            DistributedPhySCP:  +blockTarget[0][0].DistributedPhySCP - +demoTarget[0][0].AvlPhySCP,
            DistributedPhyTASP:  +blockTarget[0][0].DistributedPhyTASP - +demoTarget[0][0].AvlPhyTASP,
        }
        // console.log("updateBlockData" , updateBlockData);
       

        // const updateBlockTarget = await db.blockTarget.update(updateBlockData,{ where: {Block_Code: demoTarget[0][0].Block_Code , SubschemeId : demoTarget[0][0].SubschemeId , CompId: demoTarget[0][0].CompId } , transaction: t})
        // const deleteDemoId = await db.DemonstrationPatch.destroy({where : {DemostrationId : demoTarget[0][0].DemostrationId } , transaction: t})
        res.send({message : `'${req.query.DemostrationId}' has successfully deleted.` , type : 'success'});
        
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'DELETE Demo ID', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
       
        await t.commit();
    } catch (e) {
        await t.rollback();
        console.error(e);
        next(createError.InternalServerError());
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'DELETE Demo ID', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    }

}


exports.getDemonstrationStatusReport = async (req, res, next) => {
    try{
        const queryText = `SELECT a."DemostrationId",a."SeedDistributionStatus",b."statusPhase1",b."statusPhase2",b."statusPhase3"
        FROM "DemonstrationPatchMaster" a
        LEFT JOIN "FarmerLandDetails" b ON a."DemostrationId" = b."DemostrationId"
        WHERE "Block_Code"='${req.payload.Block_Code}' AND a."Fin_Year" = '${req.query.Fin_Year}'`;
        // console.log(queryText);
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.fieldDemonstrationIdPhaseDetails = async (req,res) => {
    try{
        const queryText1 = `SELECT b."DemostrationId",b."statusPhase1",b."statusPhase2",b."statusPhase3"
        FROM "DemonstrationPatchMaster" a
        INNER JOIN "FarmerLandDetails" b ON a."DemostrationId" = b."DemostrationId"
        WHERE "Block_Code"='${req.payload.Block_Code}'`
         const result = await db.sequelize.query(queryText1);
         res.send(result[0]);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getFieldDemonstrationPhotos = async (req,res) => {
    try{
        const queryText1 = `SELECT * FROM "FarmerLandDetails" WHERE "DemostrationId"='${req.query.DemostrationId}'`
         const result = await db.sequelize.query(queryText1);
         res.send(result[0]);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getCalculatedInputCost = async (req,res) => {
    try{
         const queryText1 = `SELECT a."schemeId", SUM(cast(a.totaleligiblesubsidy as numeric )) AS "subsidyReleased"
         FROM "PaymentMaster" a
         INNER JOIN "Farmer_Permit" b ON a."Permit_NO" = b."Permit_NO"
         WHERE a."TransId" IS NOT NULL AND b."Block_Code"='${req.payload.Block_Code}'
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
         const queryText1 = `SELECT a."schemeId", SUM(cast(a."totalEligibleIncentive" as numeric )) AS "subsidyReleased"
         FROM "InctvPaymentMaster" a
         INNER JOIN "Farmer_Permit" b ON a."Permit_NO" = b."Permit_NO"
         WHERE a."TransId" IS NOT NULL AND b."Block_Code"='${req.payload.Block_Code}'
         GROUP BY a."schemeId"`
         const result = await db.sequelize.query(queryText1);
         res.send(result[0]);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}




exports.getEligibleDemonstrationData = async (req, res) => {
    try {
        const queryText = `SELECT a."DemostrationId",a."Dist_Code" , a."Block_Code" ,a."schemeId", a."SubschemeId", a."CompId",a."ConfirmBy_vaw",
        a."ConfirmBy_BAO", ddd."schemeName" , dd."SubschemeName" , b."SubCropName" , c."Variety_Name" , bb."SubCropName" AS bpSubCropName ,
        cc."Variety_Name" AS bpCropVariety, d."CompName"
        FROM "DemonstrationPatchMaster" a
        LEFT JOIN "SubCropMaster" b ON a."SubCropId" = b."SubCropId"
        LEFT JOIN "CropVarietyMaster" c ON a."Variety_Code" = c."Variety_Code"
        INNER JOIN "ComponentMaster" d ON a."CompId" = d."CompId"
        INNER JOIN "SubSchemeMaster" dd ON dd."SubschemeId" = d."SubschemeId"
        INNER JOIN "SchemeMaster" ddd ON ddd."schemeId" = d."schemeId"
        LEFT JOIN "SubCropMaster" bb ON a."BP_SubCropId" = bb."SubCropId"
        LEFT JOIN "CropVarietyMaster" cc ON a."BP_Variety_Code" = cc."Variety_Code"
        LEFT JOIN "LightTrapTable" ll ON a."DemostrationId" = ll."DemonstrationId"
        WHERE a."Block_Code"='${req.payload.Block_Code}' AND a."ConfirmBy_vaw" = '1' AND a."ConfirmBy_BAO" = '1' AND ll."StatusType" IS NULL
        GROUP BY a."DemostrationId",a."Dist_Code" , a."Block_Code" ,a."schemeId", a."SubschemeId", a."CompId",a."ConfirmBy_vaw",
        a."ConfirmBy_vaw", ddd."schemeName" , dd."SubschemeName" , b."SubCropName" , c."Variety_Name" , bb."SubCropName" ,
        cc."Variety_Name", d."CompName"`
        const result = await db.sequelize.query(queryText);
        // console.log(result);
        res.send(result[0]);
    } catch (e) {
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}

exports.getAllFarmerTrapData = async (req, res , next) => {
    try {
        const queryText1 = `SELECT * FROM "LightTrapTable" WHERE "DemonstrationId" = '${req.query.DemonstrationId}' AND "StatusType" IS NULL;`
        const result1 = await db.sequelize.query(queryText1);
        if (result1[0].length == 0) {
            const queryText = `SELECT * FROM public."Farmer_Permit" WHERE "DemonstrationId" = '${req.query.DemonstrationId}';`
            const result = await db.sequelize.query(queryText);
            res.send({result : result[0], statusType : 'Submit' })
        } else {
            res.send({result : result1[0], statusType : 'Update' })
        }
        
    } catch (e) {
        console.error(e);
        next(createError.InternalServerError());

    }
}

exports.submitTrapsData = async(req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const data = req.body;

        data.forEach(e => {
            e.Added_By = req.payload.user_id
            e.AddedOn = Date()       
            
        })

        const result = await db.LightTrapMaster.bulkCreate(data, { transaction: t })

        res.send({message : `Added Successfully.`})

        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'SubmitTrapsTarget', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
        await t.commit()
    } catch (e) {
        await t.rollback();
        console.error(e);
        next(createError.InternalServerError());
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'SubmitTrapsTarget', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    }
}

exports.updateTrapsData = async(req, res , next) => {
    const t = await sequelize.transaction();
    try {
        const data = req.body;

        const promiseArray = []

        data.forEach(e => {
            e.Updated_By = req.payload.user_id
            e.UpdatedOn = Date()

            const udpateData =  db.LightTrapMaster.update(e, { where: {  Permit_NO: e.Permit_NO , DemonstrationId: e.DemonstrationId , FarmerId : e.FarmerId} , transaction: t})
            promiseArray.push(udpateData)
        })
        const result = await Promise.all(promiseArray);
        
        res.send({message : `Updated Successfully.`})

        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'updateTrapsData', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
        await t.commit()
    } catch (e) {
        await t.rollback();
        console.error(e);
        next(createError.InternalServerError());
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'updateTrapsData', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    }
}


exports.getDemoIDToBeConfirmed = async (req, res) => {
    try {
        const queryText = `SELECT DISTINCT "DemonstrationId" FROM "LightTrapTable" WHERE "StatusType" IS NULL`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}

exports.confirmTrapsData = async(req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const udpateData = await db.LightTrapMaster.update({StatusType : 'confirmed', ConfirmedOn : Date()},{ where: { DemonstrationId: req.query.DemonstrationId } , transaction: t})
        res.send({message : `Data Successfully Confirmed.`})
        await t.commit()
    } catch (e) {
        await t.rollback();
        console.error(e);
        next(createError.InternalServerError());
    }
}