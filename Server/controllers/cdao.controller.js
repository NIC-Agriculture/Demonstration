const Sequelize = require('sequelize');
var sql = require("mssql");

const { db , sequelize } = require('../config/config');
const UserModel = require('../models/User.model');
const logController = require('./log.controller');
const requestIP = require('request-ip');
const UAParser = require('ua-parser-js');
const parser = new UAParser();
const createError = require('http-errors');
const CDAOMasterModel = require('../models/CDAOMaster.model');



const authSequelize = new Sequelize('AuthenticationDB', 'authdb', 'Auth@Db#123', {
    // host: '164.100.140.101',
    host: '10.172.0.101',
    dialect: 'mssql'
});

const locConfig = {
    user: 'authdb',
    password: 'Auth@Db#123',
    // server: '164.100.140.101',
    server: '10.172.0.101',
    database: 'AuthenticationDB',
    requestTimeout: 3600000
};


const epestSequelize = new Sequelize('e-pest', 'epest', 'E@Pest#456', {
    // host: '164.100.140.101',
    host: '10.172.0.101',
    dialect: 'mssql'
});

const locConfig1 = {
    user: 'epest',
    password: 'E@Pest#456',
    // server: '164.100.140.101',
    server: '10.172.0.101',
    database: 'e-pest',
    requestTimeout: 3600000
};


exports.checkCDAOAuthentication = async(user_id) => {
    return new Promise( async (resolve, reject) => {
        try { 
            const userID = user_id.split("_");
            if (userID[0] == 'VAW'){
                const queryText = `select ul.UserID , a.VAWName , ul.PasswordHash, ul.RoleID, ul.ContactNo, ul.AccessFailedCount, ul.Status, ur.RoleName AS User_Type,
                ul.IsLoggedIn,a.BlockCode,b.DistrictCode 
                FROM [e-pest].[dbo].[UserLogin] ul 
                INNER JOIN [e-pest].[dbo].[UserRole] ur ON ul.RoleID = ur.RoleID 
                INNER JOIN VAWGPMapping a ON ul.UserID = a.VAWCode 
                INNER JOIN LGDGP b ON a.BlockCode = b.BlockCode 
                WHERE UserID = '${user_id}'`
                const result = await epestSequelize.query(queryText);
                resolve(result[0][0])
            }else{
                const queryText = `SELECT * FROM  Auth_User where NewUsername = '${user_id}' OR Username = '${user_id}'`
                const result = await authSequelize.query(queryText);
                resolve(result[0][0])
            }
           
        }catch (e){
            reject(e)
            }
      })
}

exports.getCDAOdistDetails = async(user_id) => {
    return new Promise( async (resolve, reject) => {
        try { 
            const str = user_id;
            let distCode = str.substring(5);
            const queryText = `SELECT Dist_code, Farmer_Dist FROM Dist_Master WHERE Dist_code = ${distCode} `
            const result = await authSequelize.query(queryText);
            resolve(result[0][0])
        }catch (e){
            reject(e)
            }
      })
}

exports.getBAOblockDetails = async(user_id) => {
    return new Promise( async (resolve, reject) => {
        try { 
            const str = user_id;
            let blockCode = str.substring(4);
            const queryText = `SELECT Dist_Code, Block_Code , Block_Name  FROM Block_Master WHERE Block_Code = ${blockCode} `
            const result = await authSequelize.query(queryText);
            resolve(result[0][0])
        }catch (e){
            reject(e)
            }
      })
}


exports.getUserDetailsByUserId = async(user_id) => {
    return new Promise( async (resolve, reject) => {
        try { 
            const queryText = `SELECT 
            a."role" ,
            a."userName" , 
            a."password" , 
            b."CDAOUserID", 
            b."Dist_Code"
            FROM "users1" a 
            INNER JOIN "CDAOMaster" b 
            ON a."user_id" = b."CDAOUserID"
            WHERE a."user_id" = '${user_id}';`
            // console.log(queryText);
            const result = await db.sequelize.query(queryText);
            // console.log(result[0][0]);
            resolve(result[0][0])
        }catch (e){
            reject(e)
            }
      })
    
}

exports.getBlocks = async (req,res) => {
    try{
        const BlockData = await db.BlockMaster.findAll({
            attributes : ["Block_Code", "Block_Name"],
            where: { Dist_Code: `${req.payload.Dist_Code}` },
            raw: true
        });
        res.send(BlockData);
    } catch (e) {
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
        const queryText = `SELECT "SubschemeId","SubschemeName" FROM "SubSchemeMaster" WHERE "schemeId" = '${req.query.schemeId}';`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);  
    }catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getComponent = async (req,res) => {
    try{
        const queryText = `SELECT "CompId","CompName" , "CompTypeId" FROM "ComponentMaster" WHERE "SubschemeId" = '${req.query.SubschemeId}' 
        AND "Fin_Year" = '${req.query.Fin_Year}' AND "Active" = 1;`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    }catch(e){
        res.status(500).send('Unexpected error');
        console.error(e);

    }
}

exports.getComponentCost = async (req,res) => {
    try{
        const CompCostData = await db.ComponentCostMap.findAll({
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

exports.getCrops = async (req,res) => {
    try{
        const queryText = `SELECT a."CropId" , b."CropName" , a."FixedCropId",c."CropName" AS "FixedCropName",a."AdditionalCropId" , d."CropName" AS "AdditionalCropName" 
        FROM "ComponentCropMapping" a
        INNER JOIN "CropMaster" b on a."CropId" = b."CropId" 
		LEFT JOIN "CropMaster" c ON a."FixedCropId" = c."CropId"
		LEFT JOIN "CropMaster" d ON a."AdditionalCropId" = d."CropId"
        WHERE "SubschemeId" = '${req.query.SubschemeId}' 
        AND "CompId" = '${req.query.CompId}' AND "Fin_Year" = '${req.query.Fin_Year}'
        GROUP BY a."CropId", b."CropName", a."FixedCropId" , c."CropName" ,a."AdditionalCropId" , d."CropName";`
        // console.log(queryText);
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    }catch (e){
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}

exports.getSubCrop = async (req,res) => {
    try{
        const CompTypeId = req.query.CompTypeId
        if(CompTypeId === 'compType_1'){
            const queryText = `SELECT a."CompId", a."CropId" , a."SubCropId" AS "SubCropId" ,  a."CompTypeId" , b."SubCropName"  
            FROM "ComponentCropMapping" a 
            INNER JOIN "SubCropMaster" b 
            on a."SubCropId" = b."SubCropId"
            WHERE a."CompTypeId" =  '${CompTypeId}' AND a."CompId" = '${req.query.CompId}' AND a."Fin_Year" = '${req.query.Fin_Year}';`

            const result = await db.sequelize.query(queryText);
            res.send(result[0]);

         } else if(CompTypeId === 'compType_2'){
            const queryText = `SELECT a."CompId", a."CropId" , a."SubCropId" AS "SubCropId", a."FixedSubCropId" ,
            a."CompTypeId" , b."SubCropName"
            FROM "ComponentCropMapping" a
			INNER JOIN "SubCropMaster" b ON b."SubCropId" = a."SubCropId" 
            WHERE a."CompTypeId" =  '${CompTypeId}' AND a."CompId" = '${req.query.CompId}' AND a."Fin_Year" = '${req.query.Fin_Year}'
            GROUP BY a."CompId", a."CropId" , a."SubCropId" , a."FixedSubCropId" , a."CompTypeId" , b."SubCropName" ;`

            const result = await db.sequelize.query(queryText); 

            const SubCropData = []

            if(result[0].length > 0){
                let temp =result[0];
                for (let i = 0; i < temp.length; i++) {
                    if(temp[i].FixedSubCropId != null){
                        var SubCropIDs = [temp[i].SubCropId]
                        var fixedSubCropData = temp[i].FixedSubCropId.split(',')
                        SubCropIDs = [ ...SubCropIDs, ...fixedSubCropData ];
                    }

                    if(temp.length == i+1){
                        for (let j = 0; j < SubCropIDs.length; j++) {
                             const queryText1 = `SELECT "CropId" , "SubCropId" , "SubCropName" FROM "SubCropMaster" WHERE "SubCropId" = '${SubCropIDs[j]}';`
                             const result1 = await db.sequelize.query(queryText1);
                             SubCropData.push(result1[0][0]);

                             if(SubCropIDs.length == j+1){
                                console.log(SubCropData,"SubCropData");
                                res.send({result:result[0],SubCropData:SubCropData});
                             }
                            
                        }
                    }
                    
                }
            } else {
                res.send({ result: result[0],SubCropData:SubCropData})
            } 

         } else {
            const queryText = `SELECT a."CompId", a."CropId" , a."SubCropId" , a."AdditionalSubCropId",
            a."CompTypeId" , b."SubCropName" , c."SubCropName" AS additionalCrop
            FROM "ComponentCropMapping" a 
            INNER JOIN "SubCropMaster" b ON a."SubCropId" = b."SubCropId"
            INNER JOIN "SubCropMaster" c ON a."AdditionalSubCropId" = c."SubCropId"
            WHERE a."CompTypeId" = '${CompTypeId}' AND a."CompId" = '${req.query.CompId}' AND a."Fin_Year" = '${req.query.Fin_Year}';`
            const result = await db.sequelize.query(queryText);
            // console.log(result[0]);
            res.send(result[0]);
         }
         
    }catch (e){
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}

// exports.getSubCrop = async (req,res) => {
//     try{
//         const CompTypeId = req.query.CompTypeId
//         if(CompTypeId === 'compType_1'){
//             const queryText = `SELECT a."CompId", a."CropId" , a."SubCropId" AS "SubCropId" ,  a."CompTypeId" , b."SubCropName"  
//             FROM "ComponentCropMapping" a 
//             INNER JOIN "SubCropMaster" b 
//             on a."SubCropId" = b."SubCropId"
//             WHERE a."CompTypeId" =  '${CompTypeId}' AND a."CompId" = '${req.query.CompId}' AND a."Fin_Year" = '${req.query.Fin_Year}';`
//             // console.log("queryText", queryText);     
//             const result = await db.sequelize.query(queryText);
//             // console.log(result[0]);
//             res.send(result[0]);
//          } else if(CompTypeId === 'compType_2'){
//             // const queryText = `SELECT a."CompId", a."CropId" , a."SubCropId" AS "SubCropId", a."FixedSubCropId" AS "FixedSubCropId" ,
//             // a."CompTypeId" , b."SubCropName" , c."SubCropName" AS "FixedSubCropName"
//             // FROM "ComponentCropMapping" a
// 			// INNER JOIN "SubCropMaster" b ON b."SubCropId" = a."SubCropId"
//             // INNER JOIN "SubCropMaster" c ON c."SubCropId" = a."FixedSubCropId" 	
//             // WHERE a."CompTypeId" =  '${CompTypeId}' AND a."CompId" = '${req.query.CompId}' AND a."Fin_Year" = '${req.query.Fin_Year}'
//             // GROUP BY a."CompId", a."CropId" , a."SubCropId" , a."FixedSubCropId" , a."CompTypeId" , b."SubCropName" , c."SubCropName" ;`
//             const queryText = `SELECT a."CompId", a."CropId" , a."SubCropId" AS "SubCropId", split_part(a."FixedSubCropId",',',1) AS "FixedSubCropId" , 
//             split_part(a."FixedSubCropId",',',2) AS "FixedSubCropId2",split_part(a."FixedSubCropId",',',3) AS "FixedSubCropId3",
// 		    split_part(a."FixedSubCropId",',',4) AS "FixedSubCropId4",
//             a."CompTypeId" , b."SubCropName" , c."SubCropName" AS "FixedSubCropName", d."SubCropName" AS "FixedSubCropName2",
// 			e."SubCropName" AS "FixedSubCropName3",f."SubCropName" AS "FixedSubCropName4"
//             FROM "ComponentCropMapping" a
//             INNER JOIN "SubCropMaster" b ON b."SubCropId" = a."SubCropId"
// 			INNER JOIN "SubCropMaster" c ON c."SubCropId" = split_part(a."FixedSubCropId",',',1)
// 			LEFT JOIN "SubCropMaster" d ON d."SubCropId" = split_part(a."FixedSubCropId",',',2)
// 			LEFT JOIN "SubCropMaster" e ON e."SubCropId" = split_part(a."FixedSubCropId",',',3)
// 			LEFT JOIN "SubCropMaster" f ON e."SubCropId" = split_part(a."FixedSubCropId",',',4)	
//             WHERE a."CompTypeId" =  '${CompTypeId}' AND a."CompId" = '${req.query.CompId}' AND a."Fin_Year" = '${req.query.Fin_Year}';`
//             console.log(queryText);
//             const result = await db.sequelize.query(queryText);                       
//             console.log(result[0]);
//             res.send(result[0]);
//          } else {
//             const queryText = `SELECT a."CompId", a."CropId" , a."SubCropId" , a."AdditionalSubCropId",
//             a."CompTypeId" , b."SubCropName" , c."SubCropName" AS additionalCrop
//             FROM "ComponentCropMapping" a 
//             INNER JOIN "SubCropMaster" b ON a."SubCropId" = b."SubCropId"
//             INNER JOIN "SubCropMaster" c ON a."AdditionalSubCropId" = c."SubCropId"
//             WHERE a."CompTypeId" = '${CompTypeId}' AND a."CompId" = '${req.query.CompId}' AND a."Fin_Year" = '${req.query.Fin_Year}';`
//             const result = await db.sequelize.query(queryText);
//             // console.log(result[0]);
//             res.send(result[0]);
//          }
         
//     }catch (e){
//         res.status(500).send('Unexpected error')
//         console.error(e);
//     }
// }

exports.getCropVariety = async (req,res) => {
    try{
        const queryText = `SELECT * FROM "CropVarietyMaster" WHERE "SubCropId" = '${req.query.SubCropId}';`
        // console.log(queryText);
        const result = await db.sequelize.query(queryText);
        // console.log(result[0]);
        res.send(result[0]);
    }catch (e){
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}

exports.getItems = async (req,res) => {
    try{
        const queryText = `SELECT "ItemId","ItemName","Technical_Status" FROM "ItemMaster" WHERE "CompId" = '${req.query.CompId}' AND 
        AND "Fin_Year" = '${req.query.Fin_Year}' AND "Technical_Status" = 1 `
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    }catch(e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getbpItems = async (req,res) => {
    try{
        const queryText = `SELECT "ItemId","ItemName","Technical_Status" FROM "ItemMaster" WHERE "CompId" = '${req.query.CompId}' AND "Technical_Status" = 2`
        // const queryText = `SELECT "ItemId","ItemName","Technical_Status" FROM "ItemMaster" WHERE "CompId" = '${req.query.CompId}'
        // AND "Fin_Year" = '${req.query.Fin_Year}' AND "Technical_Status" = 2`
        // console.log(queryText);
        const result = await db.sequelize.query(queryText);
        // console.log(result);
        res.send(result[0][0]);
    }catch(e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getTechnicalName = async (req,res) => {
    try{
        const queryText = `SELECT "Technical_Code", "Technical_Name" FROM "item_crop_technicalmapping" WHERE 
        "ItemId" = '${req.query.ItemId}' AND "SubCropId" = '${req.query.SubCropId}'`
        // console.log(queryText);
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    }catch(e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getItemPackageDetails = async (req,res) => {
    try{
        const queryText = `SELECT "itemPackageSize","IndicativeCost" FROM "ItemMaster" WHERE "ItemId" = '${req.query.ItemId}' AND "Fin_Year" = '${req.query.Fin_Year}';`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    }catch(e){
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}

exports.getAllbpSubCrop = async (req,res) => {
    try{
        const queryText = `SELECT * from "BundPlantationCropMapping" where "CompId" = '${req.query.CompId}' and "ItemId" = '${req.query.ItemId}';`
        // console.log(queryText);
        const result = await db.sequelize.query(queryText);
        // console.log(result);
        res.send(result[0]);
    }catch (e){
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}

exports.getBPCropVariety = async (req,res) => {
    try{
        const queryText = `SELECT * FROM "CropVarietyMaster" WHERE "SubCropId" = '${req.query.SubCropId}';`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    }catch (e){
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}

exports.getDistrictTarget = async (req, res , next) => {
    try {
        const queryText = `SELECT "Dist_Code", "DtargetId", "PhyGen", "PhySCP", "PhyTASP", "Total_Cost",
        "AvlPhyGen" as avl_PhyGen, "AvlPhySCP" as avl_PhySCP, "AvlPhyTASP" as avl_PhyTASP,
        "DistributedPhyGen" , "DistributedPhySCP" , "DistributedPhyTASP"
        FROM "DistrictTarget"
        WHERE "Dist_Code" = '${req.payload.Dist_Code}' and "CompId" = '${req.query.CompId}' AND "Fin_Year" = '${req.query.Fin_Year}'`
        const result = await db.sequelize.query(queryText);
        // console.log(result[0]);
        res.send(result[0]);  
    } catch (e) {
        console.error(e);
        next(createError.InternalServerError());
    }
}

exports.getblockTargetData = async (req, res) => {
    try{
        const queryText = `SELECT "Dist_Code","Block_Code", "DtargetId", "schemeId", "CompId", "BtargetId", "PhyGen", "PhySCP", "PhyTASP",
        "TotalPhyGen", "TotalPhySCP" , "TotalPhyTASP",
        "AvlPhyGen" as avl_PhyGen, "AvlPhySCP" as avl_PhySCP, "AvlPhyTASP" as avl_PhyTASP , "Total_Cost" , "Fin_Year",
        coalesce("DistributedPhyGen",0) AS "DistributedPhyGen", coalesce("DistributedPhySCP",0) AS "DistributedPhySCP", 
		coalesce("DistributedPhyTASP",0) AS "DistributedPhyTASP",
        (coalesce("TotalPhyGen",0) + coalesce("TotalPhySCP",0) + coalesce("TotalPhyTASP",0)) AS "totalTarget",
        (coalesce("DistributedPhyGen",0) + coalesce("DistributedPhySCP",0) + coalesce("DistributedPhyTASP",0)) AS "totalDistributedTarget"
        FROM "BlockTarget"
        WHERE "Dist_Code" = '${req.payload.Dist_Code}' AND "CompId" = '${req.query.CompId}' 
        AND "Fin_Year" = '${req.query.Fin_Year}'`
        // console.log(queryText); 
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);  
    }catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }

}


exports.SubmitBlockTarget = async (req, res , next) => {
    const t = await sequelize.transaction();
    try {
        const data = req.body
        const distCode = `${req.payload.Dist_Code}`
        const compDetails = data.compDetails      
        // TODO: add limit: 1 in fetch condition
        const existingResult = await db.blockTarget.findAll({ where: { Dist_Code: distCode, CompId: compDetails.CompId , Fin_Year: compDetails.Fin_Year}, raw: true })
        // TODO: Redirect to udpdate function instead of sending error message to client
        if(existingResult.length) return res.send({ message: "Result already added, You can only update the records." })

        const targetCount = { AvlPhyGen: 0, AvlPhySCP: 0, AvlPhyTASP: 0 }
        const AllBlockTarget = data.blockTarget.map(e => {
            e = {...e, ...compDetails}
            e.Added_By = req.payload.userName
            e.Dist_Code = distCode
            e.AddedOn = `${Date()}`;
            e.AvlPhyGen = +e.PhyGen || 0;
            e.AvlPhySCP = +e.PhySCP || 0;
            e.AvlPhyTASP =  +e.PhyTASP || 0;
            e.TotalPhyGen = +e.PhyGen || 0;
            e.TotalPhySCP = +e.PhySCP || 0;
            e.TotalPhyTASP = +e.PhyTASP || 0;
            e.IPAddress = req.socket.remoteAddress

            targetCount.AvlPhyGen += e.AvlPhyGen;
            targetCount.AvlPhySCP += e.AvlPhySCP;
            targetCount.AvlPhyTASP += e.AvlPhyTASP;

            return e
        })
        
        // TODO: add attribute field which are required
        const distTarget = await db.districtTarget.findOne({ where: { Dist_Code: distCode , CompId: compDetails.CompId , Fin_Year: compDetails.Fin_Year}, raw:true })
        // TODO:create separate function for each subtask
       

        if(targetCount.AvlPhyGen > distTarget.AvlPhyGen || targetCount.AvlPhySCP > distTarget.AvlPhySCP || targetCount.AvlPhyTASP > distTarget.AvlPhyTASP)
            return res.send({ message: "Invalid Target.Target exceeds the available target" })

        const updateDistrictData = {
            AvlPhyGen : +distTarget.AvlPhyGen - targetCount.AvlPhyGen,
            AvlPhySCP : +distTarget.AvlPhySCP - targetCount.AvlPhySCP,
            AvlPhyTASP : +distTarget.AvlPhyTASP - targetCount.AvlPhyTASP,
            DistributedPhyGen : +distTarget.DistributedPhyGen + targetCount.AvlPhyGen,
            DistributedPhySCP : +distTarget.DistributedPhySCP + targetCount.AvlPhySCP,
            DistributedPhyTASP : +distTarget.DistributedPhyTASP + targetCount.AvlPhyTASP
        }

        const BlockTargetResult = await db.blockTarget.bulkCreate(AllBlockTarget, { transaction: t });
        const  UpdateDistrict = await db.districtTarget.update(updateDistrictData,{ where: {  Dist_Code: distCode , CompId: compDetails.CompId , Fin_Year: compDetails.Fin_Year } , transaction: t})
        res.send({message:"Target Added Successfully."})

        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'Submit', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

        await t.commit();
        
    } catch (e) {
        await t.rollback();
        console.error(e);
        next(createError.InternalServerError());
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(), 'Submit', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

    }
}

exports.UpdateBlockTarget = async (req, res , next) => {
    const t = await sequelize.transaction();
    try {
        const data = req.body
        const distCode = req.payload.Dist_Code
        const { compId, schemeId, totalCost, finYear } = data
        
        const distTarget = await db.districtTarget.findOne({
            where: { Dist_Code: distCode, CompId: compId , Fin_Year: finYear} ,
            raw:true
        })
        const existingResult = await db.blockTarget.findAll({ 
            where: { Dist_Code: distCode, CompId: compId , Fin_Year: finYear },
                raw:true 
            })
        const updateDistData = {
            AvlPhyGen: +distTarget.AvlPhyGen,
            AvlPhySCP: +distTarget.AvlPhySCP,
            AvlPhyTASP: +distTarget.AvlPhyTASP,
            DistributedPhyGen: +distTarget.DistributedPhyGen,
            DistributedPhySCP: +distTarget.DistributedPhySCP,
            DistributedPhyTASP: +distTarget.DistributedPhyTASP,
        }

        const promiseArray = []
        data.blockTargetList.forEach(e => {
        // for(let e of data.blockTargetList) {
            e.schemeId = schemeId ,
            e.CompId = compId,
            e.Total_Cost = totalCost,
            e.Fin_Year = finYear,
            e.IPAddress = req.socket.remoteAddress

            e.FinGen = e.FinGen.toFixed(0)
            e.FinSCP = e.FinSCP.toFixed(0)
            e.FinTASP = e.FinTASP.toFixed(0)

            const exData = existingResult[existingResult.findIndex(ele => e.Block_Code == ele.Block_Code && e.CompId == ele.CompId && e.Fin_Year == ele.Fin_Year)]
        
            e.Added_By = req.payload.user_id
            e.AvlPhyGen = +exData.AvlPhyGen + (+e.modifiedPhyGen || 0)
            e.AvlPhySCP = +exData.AvlPhySCP + (+e.modifiedPhySCP || 0)
            e.AvlPhyTASP = +exData.AvlPhyTASP + (+e.modifiedPhyTASP || 0)
                
            e.TotalPhyGen = (+exData.TotalPhyGen || 0) + (+e.modifiedPhyGen || 0)
            e.TotalPhySCP = (+exData.TotalPhySCP || 0) + (+e.modifiedPhySCP || 0)
            e.TotalPhyTASP = (+exData.TotalPhyTASP || 0) + (+e.modifiedPhyTASP || 0)

            e.PhyGen = +e.modifiedPhyGen ? +e.modifiedPhyGen : +exData.PhyGen
            e.PhySCP = +e.modifiedPhySCP ? +e.modifiedPhySCP : +exData.PhySCP
            e.PhyTASP = +e.modifiedPhyTASP ? +e.modifiedPhyTASP : +exData.PhyTASP
            // console.log(e);

            
            if(updateDistData.AvlPhyGen < +e.modifiedPhyGen || updateDistData.AvlPhySCP < +e.modifiedPhySCP || updateDistData.AvlPhyTASP < +e.modifiedPhyTASP)
            return res.send({ message: "Invalid Target.Target exceeds the available target" })
            
            const udpateData =  db.blockTarget.update(e, { where: {  Block_Code: e.Block_Code , CompId: e.CompId , Fin_Year: e.Fin_Year } , transaction: t})
            promiseArray.push(udpateData)

            updateDistData.AvlPhyGen = +updateDistData.AvlPhyGen - (+e.modifiedPhyGen || 0)
            updateDistData.AvlPhySCP = +updateDistData.AvlPhySCP - (+e.modifiedPhySCP || 0)
            updateDistData.AvlPhyTASP = +updateDistData.AvlPhyTASP - (+e.modifiedPhyTASP || 0)
            updateDistData.DistributedPhyGen = +updateDistData.DistributedPhyGen + (+e.modifiedPhyGen || 0)
            updateDistData.DistributedPhySCP = +updateDistData.DistributedPhySCP + (+e.modifiedPhySCP || 0)
            updateDistData.DistributedPhyTASP = +updateDistData.DistributedPhyTASP + (+e.modifiedPhyTASP || 0)
        // }
        });
        const result = await Promise.all(promiseArray);
        const result1 = await db.districtTarget.update(updateDistData,{ where: {  Dist_Code: distCode , CompId: compId , Fin_Year: finYear } , transaction: t})
        res.send({message:"Target Added Successfully."})
        
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(), 'Update' , req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

        await t.commit();
        
    } catch (e) {
        await t.rollback();
        console.error(e);
        next(createError.InternalServerError());
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(), 'Update' , req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

    }
}


exports.getAllDealerSale = async (req, res, next) => {
    try {
        const schemeCode = req.query.schemeId
        if (schemeCode == 2){
            var schemeId = 'scheme_1'
        }else if(schemeCode == 3){
            var schemeId = 'scheme_2'
        } else if (schemeCode == 4) {
            var schemeId = 'scheme_3'
        }else {
            var schemeId = 0
        }

        if (req.query.SubschemeId == '') {
            var SubschemeId = 0
        }else{
            var SubschemeId = req.query.SubschemeId;
        }
        if (req.query.CompId == '') {
            var CompId = 0
        }else{
            var CompId = req.query.CompId; 
        }

        const queryText = `SELECT a."Block_Code", a."InvoiceNo", a."DemonstrationId" , a."Permit_NO" , a."FarmerId" , a."Farmer_Category",
                a."dealerLiscenseNo", a."SoldBy" , a."SoldOn" , a."FarmerName",SUM(cast(a."totalPrice" as numeric)) AS TotalSalePrice , 
                SUM(cast(a."eligibleSubsidy" as numeric)) AS TotalEligibleSubsidy , a."schemeId"
                FROM "DealerSale" a
                INNER JOIN "DemonstrationPatchMaster" b ON a."DemonstrationId"= b."DemostrationId"
                INNER JOIN "DealerSaleToAction" c ON c."InvoiceNo" = a."InvoiceNo"
                WHERE a."verifyStatus" = 'Verifying' AND a."Block_Code" = '${req.query.Block_Code}' AND ('0'='${schemeId}' OR  a."schemeId" = '${schemeId}')
                AND ('0'='${SubschemeId}' OR b."SubschemeId"='${SubschemeId}') AND ('0'='${CompId}' OR b."CompId"='${CompId}')
                AND c."ddaAction" is null
                AND a."Fin_year" = '${req.query.Fin_Year}'
                GROUP BY a."InvoiceNo", a."DemonstrationId" , a."Permit_NO" , a."FarmerId" , a."Farmer_Category",a."dealerLiscenseNo",
                a."SoldBy" , a."SoldOn" , a."FarmerName" , a."schemeId" , a."Block_Code"`;
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        console.log(e);
        next(createError.InternalServerError())
    }
}


exports.getReferenceIDs = async (req, res, next) => {
    try{
        const paymentType  = req.query.paymentType
        if( paymentType == 'subsidy'){
            const queryText = `SELECT a."ReferenceNo" AS referenceno FROM "DealerSale" a WHERE a."schemeId" = '${req.query.schemeId}' AND a."Dist_Code" = '${req.payload.Dist_Code}'
            GROUP BY a."ReferenceNo" `;
            const result = await db.sequelize.query(queryText);
            res.send(result[0]);
        }else if( paymentType == 'incentive') {
            const queryText = `SELECT "InctvReferenceNo" AS referenceNo FROM "Farmer_Permit" WHERE "schemeId"='${req.query.schemeId}' AND "Dist_Code" = '${req.payload.Dist_Code}'
            GROUP BY "InctvReferenceNo"`;
            const result = await db.sequelize.query(queryText);
            res.send(result[0]); 
        }
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
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

exports.approveDealerSale = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const data = req.body

        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate()
        const newMonth = month < '10' ?  `0${month}` : month;
        const newDay = day < '10' ? `0${day}` : day 
        const newDate = `${newMonth}${newDay}${year}`


        const promiseArray1= []
        const promiseArray2= []  

        const CDAOdata = {
            ddaAction : 'Approved',
            dda_UserId : req.payload.user_id,
            ddaTime : Date(),
            ddaIp : req.socket.remoteAddress
        }

        data.forEach(e => {
            const upodateCDAOAction = db.dealerSaleAction.update(CDAOdata , { where: { InvoiceNo: e.InvoiceNo } , transaction: t })
            promiseArray1.push(upodateCDAOAction)
        })
        const result1 = await Promise.all(promiseArray1)

        const maxQuery = `SELECT max(cast(substr("ReferenceNo", 25, length("ReferenceNo")) as int )) from "DealerSale" 
            where "Dist_Code"= '${req.payload.Dist_Code}' `

        const max = await db.sequelize.query(maxQuery);
        
        data.forEach(async(e) => {
            const dist = req.payload.Dist_Code
            const block = e.Block_Code;
            const schemeId = e.schemeId.charAt(e.schemeId.length - 1) ;
            const today = newDate 

            const referenceNo = max[0][0].max == null ? `SUB-${dist}-${block}-${schemeId}-${today}-1` : `SUB-${dist}-${block}-${schemeId}-${today}-${(parseInt(max[0][0].max) + 1)}`;
        
            
            // const referenceNo = `${dist}-${block}-${schemeId}-${today}`
            e.ReferenceNo = referenceNo;
            const updateData = {
                verifyStatus:'Approved_By_CDAO',
                ReferenceNo : referenceNo
            }
            const udpateDealerSaleStatus = db.dealerSale.update( updateData , { where: { InvoiceNo: e.InvoiceNo } , transaction: t })
            promiseArray2.push(udpateDealerSaleStatus)

        });
        const result2 = await Promise.all(promiseArray2)
        const insertIntoPaymntTable = await db.PaymentMaster.bulkCreate(data , { transaction: t })
        res.send({message:"Successfully Approved."})
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(), 'Approve' , req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

        await t.commit();
    } catch (e) {
        await t.rollback();
        console.log(e);
        next(createError.InternalServerError())
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(), 'Approve' , req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

    }
}

exports.returnDealerSaleToBAO = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const data = req.body
        const promiseArray1= []
       
        data.forEach(async(e) => {
            const CDAOdata = {
                ddaRemark : 'Returned_To_BAO',
                dda_UserId : req.payload.user_id,
                ddaTime : Date(),
                ddaIp : req.socket.remoteAddress
            }
           
            const udpateDealerSaleStatus = db.dealerSaleAction.update( CDAOdata , { where: { InvoiceNo: e.InvoiceNo } , transaction: t })
            promiseArray1.push(udpateDealerSaleStatus)

        });
        const result2 = await Promise.all(promiseArray1)
        res.send({message:"Successfully Returned to BAO."})
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(), 'ReturnedToBAO' , req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

        await t.commit();
    } catch (e) {
        await t.rollback();
        console.log(e);
        next(createError.InternalServerError())
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(), 'ReturnedToBAO' , req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

    }
}

exports.getAllApprovedDealerSale = async (req, res, next) => {
    try {
        const schemeCode = req.query.schemeId
        if (schemeCode == 2){
            var schemeId = 'scheme_1'
        }else if(schemeCode == 3){
            var schemeId = 'scheme_2'
        } else if (schemeCode == 4) {
            var schemeId = 'scheme_3'
        }else {
            var schemeId = 0
        }

        if (req.query.SubschemeId == '') {
            var SubschemeId = 0
        }else{
            var SubschemeId = req.query.SubschemeId;
        }
        if (req.query.CompId == '') {
            var CompId = 0
        }else{
            var CompId = req.query.CompId; 
        }

        const queryText = `SELECT a."Block_Code", a."InvoiceNo", a."DemonstrationId" , a."Permit_NO" , a."FarmerId" , a."Farmer_Category",
                a."dealerLiscenseNo", a."SoldBy" , a."SoldOn" , a."FarmerName",d."AccountNo" ,d."IFSC",d."AccountHolderName",d."BankName",d."aadhaarNo",d."ReferenceNo",
                SUM(cast(a."totalPrice" as numeric)) AS TotalSalePrice ,
                SUM(cast(a."eligibleSubsidy" as numeric)) AS TotalEligibleSubsidy , a."schemeId"
                FROM "DealerSale" a
                INNER JOIN "DemonstrationPatchMaster" b ON a."DemonstrationId"= b."DemostrationId"
                INNER JOIN "DealerSaleToAction" c ON c."InvoiceNo" = a."InvoiceNo"
                INNER JOIN "PaymentMaster" d ON d."InvoiceNo" = a."InvoiceNo"
                WHERE a."verifyStatus" = 'Approved_By_CDAO'  AND a."Block_Code" = '${req.query.Block_Code}' AND ('0'='${schemeId}' OR  a."schemeId" = '${schemeId}')
                AND ('0'='${SubschemeId}' OR b."SubschemeId"='${SubschemeId}') AND ('0'='${CompId}' OR b."CompId"='${CompId}')
                AND c."ddaAction" = 'Approved'
                AND a."Fin_year" = '${req.query.Fin_Year}'
                GROUP BY a."InvoiceNo", a."DemonstrationId" , a."Permit_NO" , a."FarmerId" , a."Farmer_Category",a."dealerLiscenseNo",
                a."SoldBy" , a."SoldOn" , a."FarmerName" , a."schemeId" , a."Block_Code",d."AccountNo" ,d."IFSC",d."AccountHolderName",d."BankName",d."aadhaarNo",d."ReferenceNo"`
        // console.log("queryText",queryText);
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        console.log(e);
        next(createError.InternalServerError())
    }
}

exports.getAllReturnedDealerSale = async (req, res, next) => {
    try {
        const schemeCode = req.query.schemeId
        if (schemeCode == 2){
            var schemeId = 'scheme_1'
        }else if(schemeCode == 3){
            var schemeId = 'scheme_2'
        } else if (schemeCode == 4) {
            var schemeId = 'scheme_3'
        }else {
            var schemeId = 0
        }

        if (req.query.SubschemeId == '') {
            var SubschemeId = 0
        }else{
            var SubschemeId = req.query.SubschemeId;
        }
        if (req.query.CompId == '') {
            var CompId = 0
        }else{
            var CompId = req.query.CompId; 
        }

        const queryText = `SELECT a."Block_Code", a."InvoiceNo", a."DemonstrationId" , a."Permit_NO" , a."FarmerId" , a."Farmer_Category",
                a."dealerLiscenseNo", a."SoldBy" , a."SoldOn" , a."FarmerName",
                SUM(cast(a."totalPrice" as numeric)) AS TotalSalePrice ,
                SUM(cast(a."eligibleSubsidy" as numeric)) AS TotalEligibleSubsidy , a."schemeId"
                FROM "DealerSale" a
                INNER JOIN "DemonstrationPatchMaster" b ON a."DemonstrationId"= b."DemostrationId"
                INNER JOIN "DealerSaleToAction" c ON c."InvoiceNo" = a."InvoiceNo"
                WHERE a."verifyStatus" = 'Verifying'  AND a."Block_Code" = '${req.query.Block_Code}' AND ('0'='${schemeId}' OR  a."schemeId" = '${schemeId}')
                AND ('0'='${SubschemeId}' OR b."SubschemeId"='${SubschemeId}') AND ('0'='${CompId}' OR b."CompId"='${CompId}')
                AND c."ddaRemark" = 'Returned_To_BAO'
                AND a."Fin_year" = '${req.query.Fin_Year}'
                GROUP BY a."InvoiceNo", a."DemonstrationId" , a."Permit_NO" , a."FarmerId" , a."Farmer_Category",a."dealerLiscenseNo",
                a."SoldBy" , a."SoldOn" , a."FarmerName" , a."schemeId" , a."Block_Code"`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        console.log(e);
        next(createError.InternalServerError())
    }
}

exports.generatePaymntFile = async (req, res, next) => {
    const t = await sequelize.transaction();
    try{
        const referenceNo = req.query.ReferenceNo
        const schemeId = req.query.schemeId
        if (req.query.paymentType=='subsidy') {
            const queryText = `SELECT a.*, b."FarmerId", b."Farmer_Category", b."Gender", c."Block_Name",d."schemeName", e."Dist_Name"
            FROM "PaymentMaster" a
            INNER JOIN "Farmer_Permit" b ON a."Permit_NO" = b."Permit_NO"
            INNER JOIN "LGBlocks" c ON c."Block_Code" = b."Block_Code"
            INNER JOIN "SchemeMaster" d ON d."schemeId" = b."schemeId" 
            INNER JOIN "LGDistricts" e ON e."Dist_Code" = '${req.payload.Dist_Code}'  
            WHERE a."ReferenceNo" = '${req.query.ReferenceNo}' AND a."schemeId" = '${req.query.schemeId}' AND a."PymntFileGenerated" is null
            ORDER BY d."schemeName"`
            const result = await db.sequelize.query(queryText);
    
            const updateData = {
                PymntFileDt : Date(),
                PymntFileGenerated : '0',
                PymntSt: '0'
            }
    
            const updatePymntTable = await db.PaymentMaster.update( updateData , { where: { ReferenceNo: referenceNo , schemeId : schemeId , PymntFileGenerated : null} , transaction: t })
          
            res.send(result[0]);
            logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(), 'Generate' , req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
        }else if( req.query.paymentType=='incentive' ) {

            const queryText = `SELECT a.*,a."totalEligibleIncentive" AS totaleligiblesubsidy ,b."FarmerId",b."Farmer_Category",b."Gender",c."Block_Name",d."schemeName", f."SubschemeName",e."Dist_Name"
            FROM "InctvPaymentMaster" a
            INNER JOIN "Farmer_Permit" b ON a."Permit_NO" = b."Permit_NO"
            INNER JOIN "LGBlocks" c ON c."Block_Code" = b."Block_Code"
            INNER JOIN "SchemeMaster" d ON d."schemeId" = b."schemeId"
            INNER JOIN "SubSchemeMaster" f ON f."SubschemeId" = b."SubschemeId"
            INNER JOIN "LGDistricts" e ON e."Dist_Code" = '${req.payload.Dist_Code}'
            WHERE a."ReferenceNo" = '${req.query.ReferenceNo}' AND a."schemeId" = '${req.query.schemeId}'
            AND a."PymntFileGenerated" IS NULL AND a."PymntSt" IS NULL
            ORDER BY d."schemeName"`
            const result = await db.sequelize.query(queryText);
    
            const updateData = {
                PymntFileDt : Date(),
                PymntFileGenerated : '0',
                PymntSt: '0'
            }
    
            const updateInctvPymntTable = await db.InctvPaymentMaster.update( updateData , { where: { ReferenceNo: referenceNo , schemeId : schemeId , PymntFileGenerated : null} , transaction: t })
          
            res.send(result[0]);
            logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(), 'Generate' , req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
        }


        await t.commit();
    } catch (e) {
        await t.rollback();
        res.status(500).send('Unexpected error');
        console.error(e);
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(), 'Generate' , req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

    }
}

exports.getIncetiveList = async (req , res , next) => {
 try {

    const schemeCode = req.query.schemeId
        if (schemeCode == 2){
            var schemeId = 'scheme_1'
        }else if(schemeCode == 3){
            var schemeId = 'scheme_2'
        } else if (schemeCode == 4) {
            var schemeId = 'scheme_3'
        }else {
            var schemeId = 0
        }
    
    const queryText = `SELECT c."DemostrationId" , c."Demonstration_Area" , c."Block_Code" ,c."schemeId", a."CompId" ,  f."CompName" , a."Permit_NO" , a."FarmerId", a."LandArea" , 
    a."Farmer_Category" , e."IndicativeCost", (a."LandArea" * cast(e."IndicativeCost" as int) ) AS "eligible_Incentive"
    FROM "Farmer_Permit" a 
    INNER JOIN "FarmerLandDetails" b ON b."DemostrationId" = a."DemonstrationId"
    INNER JOIN "DemonstrationPatchMaster" c ON c."DemostrationId" = a."DemonstrationId"
    INNER JOIN "ItemMaster" d ON d."CompId" = a."CompId" AND d."Fin_Year" = a."Fin_year"
    INNER JOIN "itemPackageMaster" e ON e."ItemId" = d."ItemId" AND d."Fin_Year" = a."Fin_year"
    INNER JOIN "ComponentMaster" f ON f."CompId" = a."CompId" AND f."Fin_Year" = a."Fin_year"
    WHERE c."Block_Code"='${req.query.Block_Code}' 
    AND ('0'='${schemeId}' or  c."schemeId" = '${schemeId}')
    AND b."statusPhase1" = 'Completed' 
    AND d."Technical_Status" = '3'
    AND a."InctvReferenceNo" is NULL
    GROUP BY c."DemostrationId" ,c."Demonstration_Area", c."Block_Code" , c."schemeId" ,a."FarmerId", a."LandArea" , a."CompId" , a."Permit_NO", e."IndicativeCost" ,  f."CompName" `
    
    const result = await db.sequelize.query(queryText);
    res.send(result[0]);

 } catch (e) {
    res.status(500).send('Unexpected error');
    console.error(e);
 }

}

exports.approveIncentiveList = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const data = req.body

        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate()
        const newMonth = month < '10' ?  `0${month}` : month;
        const newDay = day < '10' ? `0${day}` : day 
        const newDate = `${newMonth}${newDay}${year}`

        const promiseArray1= []
        const promiseArray2= []

        const maxQuery = `SELECT max(cast(substr("InctvReferenceNo", 27 , length("InctvReferenceNo")) as int )) from "Farmer_Permit" 
        where "Dist_Code"= '${req.payload.Dist_Code}'`

        const max = await db.sequelize.query(maxQuery);
        
        data.forEach(async(e) => {
            e.totalEligibleIncentive = e.eligible_Incentive
            const dist = req.payload.Dist_Code
            const block = e.Block_Code;
            const compId = e.CompId.charAt(e.CompId.length - 1);
            const schemeId = e.schemeId.charAt(e.schemeId.length - 1) ;            
            // const today = new Date().toLocaleDateString().replace('/', '').replace('/','') 
            const today = newDate

            const referenceNo = max[0][0].max == null ? `INCTV-${dist}-${block}-${schemeId}-${today}-1` : `INCTV-${dist}-${block}-${schemeId}-${today}-${(parseInt(max[0][0].max) + 1)}`;
            e.ReferenceNo = referenceNo;
        
            const updateData = {
                InctvReferenceNo : referenceNo
            }
            const udpateInctvRefNo = db.farmerPermit.update( updateData , { where: { Permit_NO: e.Permit_NO } , transaction: t })
            promiseArray2.push(udpateInctvRefNo)
        });
        const result2 = await Promise.all(promiseArray2)
        const insertIntoInctvPaymntTable = await db.InctvPaymentMaster.bulkCreate(data , { transaction: t })
        res.send({message:"Successfully Approved."})
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(), 'Approve' , req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

        await t.commit();
    } catch (e) {
        await t.rollback();
        console.log(e);
        next(createError.InternalServerError())
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(), 'Approve' , req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

    }
}

exports.getReferenceIDsForpayment = async (req, res, next) => {
    try{
        const paymentType  = req.query.paymentType
        if( paymentType == 'subsidy'){
            const queryText = `SELECT a."ReferenceNo" AS referenceno FROM "DealerSale" a 
            GROUP BY a."ReferenceNo"`;
            const result = await db.sequelize.query(queryText);
            res.send(result[0]);
        }else if( paymentType == 'incentive') {
            const queryText = `SELECT "InctvReferenceNo" AS referenceNo FROM "Farmer_Permit" 
            GROUP BY "InctvReferenceNo"`;
            const result = await db.sequelize.query(queryText);
            res.send(result[0]); 
        }
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getPermitSaleDetails = async (req, res, next) => {
    try{
        const paymentType  = req.query.paymentType
        if( paymentType == 'subsidy'){
            const queryText = `SELECT b."FarmerId", a."Permit_NO",a."InvoiceNo",a."AccountHolderName",a."AccountNo",a."IFSC",a."BankName"
            FROM "PaymentMaster" a
            INNER JOIN "DealerSale" b ON a."InvoiceNo" = b."InvoiceNo"
            WHERE a."ReferenceNo"='${req.query.ReferenceNo}' AND a."TransId" IS null  AND a."PymntFileGenerated" = '0' AND a."PymntSt" ='0'
            GROUP BY b."FarmerId", a."Permit_NO",a."InvoiceNo",a."AccountHolderName",a."AccountNo",a."IFSC",a."BankName"`;
            const result = await db.sequelize.query(queryText);
            res.send(result[0]);
        }else if( paymentType == 'incentive') {
            const queryText = `SELECT b."FarmerId", a."Permit_NO",a."AccountHolderName",a."AccountNo",a."IFSC",a."BankName"  
            FROM "InctvPaymentMaster" a
            INNER JOIN "Farmer_Permit" b ON a."Permit_NO" = b."Permit_NO"
            WHERE a."ReferenceNo" = '${req.query.ReferenceNo}' AND a."TransId" is null AND a."PymntFileGenerated" = '0' AND a."PymntSt" ='0'
            GROUP BY b."FarmerId", a."Permit_NO",a."AccountHolderName",a."AccountNo",a."IFSC",a."BankName"`;
            const result = await db.sequelize.query(queryText);
            res.send(result[0]); 
        }
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.UpdateTransactionDetails = async (req,res,next) => {
    const t = await sequelize.transaction();
    try {
        const promiseArray1 = []
        const SelectedPermitDetails = req.body.SelectedPermitDetails
        if (req.body.paymentType == 'subsidy') {
                SelectedPermitDetails.forEach(async(e,key) => {
                    const updateData = {
                                    TransId:req.body.TransId,
                                    Remark:e.rejectReason,
                                    PymntSt : e.PymntSt
                                }
                    const InvoiceNo = e.InvoiceNo
                    const referenceNo = req.body.ReferenceNo
                    // console.log("updateData", updateData);
                    const updatePymntTable = db.PaymentMaster.update( updateData , { where: { ReferenceNo: referenceNo,InvoiceNo:InvoiceNo} , transaction: t })
                    promiseArray1.push(updatePymntTable)
                }); 
                const result1 = await Promise.all(promiseArray1)
                res.send({message:'Payment Details updated successfully.'});
                logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(), 'Update Payment' , req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
            
        }else if(req.body.paymentType == 'incentive') {
                SelectedPermitDetails.forEach(async(e,key) => {
                    const updateData = {
                                    TransId:req.body.TransId,
                                    Remark:e.rejectReason
                                }
                    const Permit_NO = e.Permit_NO            
                    const referenceNo = req.body.ReferenceNo
                    const updateInctvTable = db.InctvPaymentMaster.update( updateData , { where: { ReferenceNo: referenceNo, Permit_NO: Permit_NO} , transaction: t })
                    promiseArray1.push(updateInctvTable)
                }); 

                const result1 = await Promise.all(promiseArray1)
                res.send({message:'Payment Details updated successfully.'});
                logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(), 'Update Payment' , req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
      
        }
        await t.commit();
    } catch (e) {
        await t.rollback();
        console.log(e);
        next(createError.InternalServerError())
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(), 'Generate' , req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    }
}


// ///////////////////////////////////====== Report Api ==============////////////////////////////////

exports.getBlockWiseSeedReport = async (req, res, next) => {
    try {
        
        const queryText = ` SELECT a."Block_Code" ,f."Block_Name" , a."DemostrationId" ,
            COUNT(b."FarmerId") AS totalFarmerInvolved, SUM(b."LandArea") AS totalLand,
            c."SubCropName",cc."SubCropName" AS bpSubCropName ,dd."Variety_Name" AS bpCropVarietyName,
            d."Variety_Name" ,e."Cost_of_Seed" ,e."Unit" ,
            e."Seed_Per_ha" * SUM(b."LandArea") AS totalSeedRequired,
            g."itemPackageSize" , g."IndicativeCost" AS BPSeedCost, g."item_unit",
		    CAST(g."itemPackageSize" as int) * SUM(b."LandArea") AS totalBPSeedRequired
            FROM "DemonstrationPatchMaster" a
            INNER JOIN "Farmer_Permit" b ON a."DemostrationId" = b."DemonstrationId"
            INNER JOIN "CropVarietyMaster" d ON a."Variety_Code" = d."Variety_Code"
            INNER JOIN "ComponentCostMapping" e ON a."CompId" = e."CompId"
            INNER JOIN "LGBlocks" f ON a."Block_Code" = f."Block_Code"
            LEFT JOIN "SubCropMaster" c ON a."SubCropId" = c."SubCropId" 
            LEFT JOIN "SubCropMaster" cc ON  a."BP_SubCropId" = cc."SubCropId"
            LEFT JOIN "CropVarietyMaster" dd ON a."BP_Variety_Code" = dd."Variety_Code"
            LEFT JOIN "itemPackageMaster" g ON a."bp_ItemId" = g."ItemId"
            WHERE a."Block_Code"= '${req.query.Block_Code}' 
            GROUP BY a."Block_Code",  a."DemostrationId" , c."SubCropName" , d."Variety_Name",
            e."Cost_of_Seed" , e."Unit" ,  e."Seed_Per_ha", f."Block_Name" ,cc."SubCropName",dd."Variety_Name",
            g."itemPackageSize" , g."IndicativeCost" , g."item_unit"`
        
            // console.log(queryText);

        const result = await db.sequelize.query(queryText);
        // console.log(result[0]);
        res.send(result[0]);
        
    } catch (e) {
        console.log(e);
        next(createError.InternalServerError())
    }
}

exports.getCompTargetDetails  = async (req,res) => {
    try {
        const queryText = `SELECT aa."Dist_Name" , a."itemTechRefNo", a."Fin_Year", b."schemeName", c."SubschemeName" , d."CompName" , e."CropName" ,
        f."SubCropName" , g."Variety_Name" , h."SubCropName" AS "bp_SubCropName" ,
        i."Variety_Name" AS "bp_CropVarietyName"
        FROM "BlockTarget" a
        INNER JOIN "LGDistricts" aa ON a."Dist_Code" = aa."Dist_Code" 
        INNER JOIN "SchemeMaster" b ON a."schemeId" = b."schemeId" 
        INNER JOIN "SubSchemeMaster" c ON a."SubschemeId" = c."SubschemeId"
        INNER JOIN "ComponentMaster" d ON a."CompId" = d."CompId"
        INNER JOIN "CropMaster" e ON a."CropId" = e."CropId"
        INNER JOIN "SubCropMaster" f ON a."SubCropId" = f."SubCropId"
        INNER JOIN "CropVarietyMaster" g ON a."Variety_Code" = g."Variety_Code"
        LEFT JOIN "SubCropMaster" h ON a."BP_SubCropId" = h."SubCropId"
        LEFT JOIN "CropVarietyMaster" i ON a."BP_Variety_Code" = i."Variety_Code"
        WHERE a."Dist_Code" = '${req.payload.Dist_Code}'  AND a."schemeId" = '${req.query.schemeId}' AND a."SubschemeId" = '${req.query.SubschemeId}' 
        AND a."CompId" = '${req.query.CompId}' AND a."Fin_Year" = '${req.query.Fin_Year}' GROUP BY  aa."Dist_Name" , a."itemTechRefNo", a."Fin_Year", b."schemeName", c."SubschemeName" , d."CompName" , e."CropName" ,
        f."SubCropName" , g."Variety_Name" , h."SubCropName" ,
        i."Variety_Name"`

        // console.log(queryText);
        const result = await db.sequelize.query(queryText);
        // console.log(result);
        res.send(result[0]);  
        
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

// exports.getItemTechDetails  = async (req,res) => {
//     try {
//         const queryText = `SELECT b."ItemName" , a."Technical_Name"
//         FROM "BlockTarget_ItemTechnical" a 
//         INNER JOIN "ItemMaster" b ON a."ItemId" = b."ItemId"
//         WHERE  a."CompId" = '${req.query.CompId}' AND a."itemTechRefNo" = '${req.query.itemTechRefNo}'`
        
//         const result = await db.sequelize.query(queryText);
//         res.send(result[0]);  
        
//     } catch (e) {
//         res.status(500).send('Unexpected error');
//         console.error(e);
//     }
// }

exports.getAvailableTarget = async (req,res) => {
    try{
        const queryText = `SELECT b."schemeName", c."SubschemeName", d."CompName",a."TotalPhyGen" + a."TotalPhySCP" + a."TotalPhyTASP" as "TotalTarget" ,
		a."AvlPhyGen" + a."AvlPhySCP" + a."AvlPhyTASP"  as "TotalAvlTarget" , a."DistributedPhyGen" + a."DistributedPhySCP" + a."DistributedPhyTASP" as "DistributedTarget"
		from "DistrictTarget" a
        INNER JOIN "SchemeMaster" b ON a."schemeId" = b."schemeId"
        INNER JOIN "SubSchemeMaster" c ON a."SubschemeId" = c."SubschemeId"
        INNER JOIN "ComponentMaster" d ON a."CompId" = d."CompId" AND d."Fin_Year" = a."Fin_Year"
        where a."Dist_Code" = '${req.payload.Dist_Code}' AND a."Fin_Year" = '${req.query.Fin_Year}' AND a."schemeId" = '${req.query.schemeId}' `
        // console.log(queryText);
        const result = await db.sequelize.query(queryText);
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
        WHERE a."Dist_Code" = '${req.payload.Dist_Code}';`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e); 
    }
}

// exports.getItemNameAndTechnicalNameReport = async (req,res) => {
//     try {
//         const queryText = `Select a."itemTechRefNo",b."ItemId",c."ItemName",b."Technical_Code",b."Technical_Name" from "BlockTarget" a
//         INNER JOIN "BlockTarget_ItemTechnical" b ON a."itemTechRefNo" = b."itemTechRefNo"
//         INNER JOIN "ItemMaster" c ON b."ItemId" = c."ItemId" 
//         WHERE a."CompId"='${req.query.CompId}' AND a."Fin_Year"='${req.query.Fin_Year}' AND a."SubschemeId"='${req.query.SubschemeId}' AND a."Dist_Code"='${req.payload.Dist_Code}'
//         group by a."itemTechRefNo",b."ItemId",c."ItemName",b."Technical_Code",b."Technical_Name";`
//         const result = await db.sequelize.query(queryText);
//         res.send(result[0]);
//     } catch (e) {
//         res.status(500).send('Unexpected error');
//         console.error(e); 
//     }
// }

exports.getDemonstrationStatusReport = async (req, res, next) => {
    try{
        const queryText = `SELECT c."SubschemeName",d."CompName",a."DemostrationId",a."SeedDistributionStatus",b."statusPhase1",b."statusPhase2",b."statusPhase3"
        FROM "DemonstrationPatchMaster" a
		INNER JOIN "SubSchemeMaster" c on c."SubschemeId" = a."SubschemeId"
		INNER JOIN "ComponentMaster" d on d."CompId" = a."CompId" AND d."Fin_Year" = a."Fin_Year"
        LEFT JOIN "FarmerLandDetails" b ON a."DemostrationId" = b."DemostrationId"
        WHERE "Dist_Code"='${req.payload.Dist_Code}' AND ('0'='${req.query.Block_Code}' or  a."Block_Code" = '${req.query.Block_Code}') AND a."Fin_Year" = '${req.query.Fin_Year}'`;
        // console.log(queryText);
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getclusterDemonstration = async (req,res) => {
    try{
        const queryText = `SELECT a."DemostrationId",d."SubschemeName" ,a."Gp_Code",a."lgd_wardcode",a."vaw_userId", SUM(CASE WHEN c."Farmer_Category"  = 'General' THEN 1 ELSE 0 END) as "GenFarmer",
           SUM(CASE WHEN c."Farmer_Category"  = 'SC' THEN 1 ELSE 0 END) as "SCFarmer", SUM(CASE WHEN c."Farmer_Category"  = 'ST' THEN 1 ELSE 0 END) as "STFarmer",
           b."CompName",a."PhyGen", a."PhySCP", a."PhyTasp", a."AvlPhyGen", a."AvlPhySCP", a."AvlPhyTASP" 
           FROM "DemonstrationPatchMaster" a
           INNER JOIN "SubSchemeMaster" d ON a."SubschemeId" = d."SubschemeId"
           INNER JOIN "ComponentMaster" b ON a."CompId" = b."CompId" AND b."Fin_Year" = a."Fin_Year"
           LEFT JOIN "Farmer_Permit" c ON a."DemostrationId" = c."DemonstrationId"
           WHERE a."Block_Code" = '${req.query.Block_Code}' AND a."Fin_Year"='${req.query.Fin_Year}' 
           GROUP BY a."DemostrationId",d."SubschemeName",a."Gp_Code",a."lgd_wardcode",a."vaw_userId",
           b."CompName",a."PhyGen", a."PhySCP", a."PhyTasp",a."AvlPhyGen", a."AvlPhySCP", a."AvlPhyTASP";`
        //    console.log("queryText",queryText);
        const result = await db.sequelize.query(queryText);
        const GpData = []
        if(result[0].length > 0){
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
        } else {
            res.send({ result: result[0], GpData: GpData })
        }
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


exports.RegeneratePaymntFile = async (req, res, next) => {
    try{
        const paymentType  = req.query.paymentType
        if( paymentType == 'subsidy'){
            const queryText = `SELECT a.*,f."SubschemeName", b."FarmerId", b."Farmer_Category", b."Gender", c."Block_Name",d."schemeName", e."Dist_Name"
            FROM "PaymentMaster" a
            INNER JOIN "Farmer_Permit" b ON a."Permit_NO" = b."Permit_NO"
            INNER JOIN "LGBlocks" c ON c."Block_Code" = b."Block_Code"
            INNER JOIN "SchemeMaster" d ON d."schemeId" = b."schemeId" 
            INNER JOIN "SubSchemeMaster" f ON f."SubschemeId" = b."SubschemeId"
            INNER JOIN "LGDistricts" e ON e."Dist_Code" = '${req.payload.Dist_Code}'  
            WHERE a."ReferenceNo" = '${req.query.ReferenceNo}' AND a."schemeId" = '${req.query.schemeId}' AND a."PymntFileGenerated" = '0'
            ORDER BY d."schemeName"`;
            const result = await db.sequelize.query(queryText);
            res.send(result[0]);
        }else if( paymentType == 'incentive') {
            const queryText = `SELECT a.*,a."totalEligibleIncentive" AS totaleligiblesubsidy , b."FarmerId", b."Farmer_Category", b."Gender", c."Block_Name", d."schemeName", f."SubschemeName", e."Dist_Name"
            FROM "InctvPaymentMaster" a
            INNER JOIN "Farmer_Permit" b ON a."Permit_NO" = b."Permit_NO"
            INNER JOIN "LGBlocks" c ON c."Block_Code" = b."Block_Code"
            INNER JOIN "SchemeMaster" d ON d."schemeId" = b."schemeId"
            INNER JOIN "SubSchemeMaster" f ON f."SubschemeId" = b."SubschemeId"
            INNER JOIN "LGDistricts" e ON e."Dist_Code" = '${req.payload.Dist_Code}'
            WHERE a."ReferenceNo" = '${req.query.ReferenceNo}' AND a."schemeId" = '${req.query.schemeId}'
            AND a."PymntFileGenerated" = '0'
            ORDER BY d."schemeName"`;
            const result = await db.sequelize.query(queryText);
            res.send(result[0]); 
        }
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getCropCatagory = async (req,res) => {
    try{
        const queryText = `select "CropId","CropName" from "CropMaster"`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getCrop = async (req,res) => {
    try{
        const queryText = `select "SubCropId","SubCropName" from "SubCropMaster" where "CropId"='${req.query.CropId}' `
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.AddCropVariety = async (req,res) => {
    try {
       const data = req.body;
       const maxQuery = `SELECT max(cast(substr("Variety_Code", 2 , length("Variety_Code")) as int )) from "CropVarietyMaster"`;
       const max = await db.sequelize.query(maxQuery);
       var maxPrvsNumber ;
       var maxPrvsNumber =  max[0][0].max;
       data.forEach(e => {
            if (maxPrvsNumber == max[0][0].max) {
                var Variety_Code = max[0][0].max == null ? `V - 1` : `V${(parseInt(max[0][0].max) + 1)}`;
                maxPrvsNumber = maxPrvsNumber + 1
            } else {
                var Variety_Code = max[0][0].max == null ? `V - 1` : `V${(parseInt(maxPrvsNumber) + 1)}`;
                maxPrvsNumber = maxPrvsNumber + 1
            }
            e.Variety_Code = Variety_Code,
            e.IS_ACTIVE = 1,
            e.STATUS = 1
            return e
        });
        const addVarietyResult = await db.CropVarietyMaster.bulkCreate(data);
        res.send({ message: "Crop Variety Added Successfully." })
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getCalculatedInputCost = async (req,res) => {
    try{
         const queryText1 = `SELECT a."schemeId", SUM(cast(a.totaleligiblesubsidy as numeric )) AS "subsidyReleased"
         FROM "PaymentMaster" a
         INNER JOIN "Farmer_Permit" b ON a."Permit_NO" = b."Permit_NO"
         WHERE a."TransId" IS NOT NULL AND b."Dist_Code" = '${req.payload.Dist_Code}'
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
         WHERE a."TransId" IS NOT NULL AND b."Dist_Code" = '${req.payload.Dist_Code}'
         GROUP BY a."schemeId"`
         const result = await db.sequelize.query(queryText1);
         res.send(result[0]);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}
