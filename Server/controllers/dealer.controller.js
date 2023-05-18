const { db , sequelize } = require('../config/config');
// const logController = require('./log.controller');
const logController = require('./log.controller');
const requestIP = require('request-ip');
const UAParser = require('ua-parser-js');
const parser = new UAParser();
const createError = require('http-errors');


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


exports.getBlocks = async (req,res) => {
    try {
        const BlockData = await db.BlockMaster.findAll({
            attributes : ["Block_Code" , "Block_Name"],
            where : {Dist_Code:req.payload.dealerDistrict},
            raw: true
        })
        res.send(BlockData)
    } catch (e) {
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}

exports.getDemonstrationId = async(req,res) => {
        try {
            const DemonstrationId = await db.DemonstrationPatch.findAll({
                where: { Dist_Code : req.payload.dealerDistrict},
                raw: true
            })
            // console.log(DemonstrationId);
            res.send(DemonstrationId)
        } catch (e) {
            res.status(500).send('Unexpected error')
            console.error(e);
        }
}

exports.getDistrictPrefix = async (req, res) => {
    try {
        const queryText = `SELECT "Dist_Name","Dist_Prefix" FROM public."LGDistricts" WHERE "Dist_Code" = '${req.payload.dealerDistrict}';`
        const result = await db.sequelize.query(queryText);
        // console.log(result[0]);
        res.send(result[0][0]);
    } catch (e) {
        console.error(e);
        res.status(500).send('Unexpected error')
    }
}

exports.getPermitList = async(req,res) => {
    try {
        const FarmerId = await db.farmerPermit.findAll({
            where: { FarmerId : req.query.FarmerId},
            raw: true
        })
        res.send(FarmerId)
    } catch (e) {
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}


exports.getItems = async (req,res) => {
    try{
        const queryText = `SELECT "ItemId","ItemName","Technical_Status" FROM "ItemMaster" WHERE "CompId" = '${req.query.CompId}' AND "Technical_Status" in (1,11)`
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    }catch(e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getTechnicalName = async (req,res) => {
    try{
        if (req.query.Technical_Status == 11) {
            const queryText = `SELECT "Technical_Code", "Technical_Name" FROM "item_crop_technicalmapping" `
            const result = await db.sequelize.query(queryText);
            res.send(result[0])            
        } else if (req.query.ItemId == 'item_340') {
            const queryText = `SELECT "Technical_Code", "Technical_Name" FROM "item_crop_technicalmapping" WHERE 
            "ItemId" in ('${req.query.ItemId}','item_335','item_341')`
            const result = await db.sequelize.query(queryText);
            res.send(result[0])
        } else if (req.query.ItemId == 'item_348') {
            const queryText = `SELECT "Technical_Code", "Technical_Name" FROM "item_crop_technicalmapping" WHERE 
            "ItemId" in ('${req.query.ItemId}','item_343' , 'item_349')`
            const result = await db.sequelize.query(queryText);
            res.send(result[0])
        } else if (req.query.ItemId == 'item_356') {
            const queryText = `SELECT "Technical_Code", "Technical_Name" FROM "item_crop_technicalmapping" WHERE 
            "ItemId" in ('${req.query.ItemId}','item_351','item_357')`
            const result = await db.sequelize.query(queryText);
            res.send(result[0])
        } else if (req.query.ItemId == 'item_364') {
            const queryText = `SELECT "Technical_Code", "Technical_Name" FROM "item_crop_technicalmapping" WHERE 
            "ItemId" in ('${req.query.ItemId}','item_359','item_365')`
            const result = await db.sequelize.query(queryText);
            res.send(result[0])
        } else if (req.query.ItemId == 'item_396') {
            const queryText = `SELECT "Technical_Code", "Technical_Name" FROM "item_crop_technicalmapping" WHERE 
            "ItemId" in ('${req.query.ItemId}','item_397')`
            const result = await db.sequelize.query(queryText);
            res.send(result[0])
        } else if (req.query.ItemId == 'item_385') {
            const queryText = `SELECT "Technical_Code", "Technical_Name" FROM "item_crop_technicalmapping" WHERE 
            "ItemId" in ('${req.query.ItemId}','item_386')`
            const result = await db.sequelize.query(queryText);
            res.send(result[0])
        } else{
            const queryText = `SELECT "Technical_Code", "Technical_Name" FROM "item_crop_technicalmapping" WHERE 
            "ItemId" = '${req.query.ItemId}'`
            const result = await db.sequelize.query(queryText);
            res.send(result[0])
        }
               
    }catch(e){
        res.status(500).send('Unexpected error');
        console.error(e);
    } 
}


// exports.getEligibleTechnicalName = async(req,res) => {
//     try {
//         const queryText = `Select a.* , b."ItemName" FROM "BlockTarget_ItemTechnical" a
//         INNER JOIN "ItemMaster" b ON a."ItemId" = b."ItemId" 
//         WHERE a."itemTechRefNo" = ${req.query.itemTechRefNo}`
//         const result = await db.sequelize.query(queryText);
//         res.send(result[0]);
//     } catch (e) {
//         res.status(500).send('Unexpected error')
//         console.error(e);
//     }
// }

exports.getPurchasedTechnicalName = async(req,res) => {
    try {
        const purchasedItem = await db.dealerSale.findAll({
            attributes : ['CompId', 'ItemId' , 'Technical_Code' ,'Technical_Name' , 'eligibleSubsidy'],
            where: { FarmerId : req.query.FarmerId , CompId : req.query.CompId , ItemId : req.query.ItemId },
            raw: true
        })
        res.send(purchasedItem)
    } catch (e) {
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}

exports.getItemPrice = async(req,res) => {
    try {
        const result = await db.itemPriceDetails.findAll({
            // attributes : ['CompId', 'ItemId' , 'Technical_Code' ,'Technical_Name','Fin_Year'],
            where: { ItemId : req.query.ItemId},
            raw: true
        })
        res.send(result)
    } catch (e) {
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}

exports.submitDealerSale = async(req,res) => {
    const t = await sequelize.transaction();
    try {
        const data = req.body
        const { Permit_NO,DemonstrationId,Dist_Code,Block_Code,dealerDistrict, schemeId ,CompId ,itemTechRefNo ,FarmerId,Gp_Code,FarmerName,Gender,
        Farmer_Category,MobileNo, LandArea,CropId,Variety_Code ,Fin_year } = data.permitList

        const maxQuery = `SELECT max(cast(substr("InvoiceNo", 16, length("InvoiceNo")) as int )) from "DealerSale" 
        where "Fin_year"='${Fin_year}' and "Dist_Code"= '${Dist_Code}' `

        const max = await db.sequelize.query(maxQuery);

        const InvoiceNo = max[0][0].max == null ? `IV/${Dist_Code}/${Fin_year}/1` : `IV/${Dist_Code}/${Fin_year}/${(parseInt(max[0][0].max) + 1)}`;
        // console.log(InvoiceNo);

        data.DealerSaleForm.forEach( e => {
            e.Permit_NO = Permit_NO
            e.DemonstrationId = DemonstrationId
            e.Dist_Code = Dist_Code
            e.Block_Code = Block_Code
            e.dealerDistrict = dealerDistrict
            e.schemeId = schemeId
            e.CompId = CompId
            // e.itemTechRefNo = itemTechRefNo
            e.FarmerId = FarmerId
            e.Gp_Code = Gp_Code
            e.FarmerName = FarmerName
            e.Gender = Gender
            e.Farmer_Category = Farmer_Category
            e.MobileNo = MobileNo
            e.LandArea = LandArea
            e.CropId = CropId
            e.Variety_Code = Variety_Code
            e.SoldBy = req.payload.userName
            e.dealerDistrict = req.payload.dealerDistrict
            e.dealerLiscenseNo = req.payload.dealerLiscenseNo,
            e.verifyStatus = 'NotVerified'
            e.SoldOn = `${Date()}`
            e.Fin_year = Fin_year
            e.InvoiceNo = InvoiceNo,
            e.IPAddress = req.socket.remoteAddress
            delete e.technicalDetails
            delete e.item
            return e
        })

        const result = await db.dealerSale.bulkCreate(data.DealerSaleForm , { transaction: t });
        const updateFarmerPermit =  await db.farmerPermit.update({"saleStatus": 'sold' },{ where: {"FarmerId": FarmerId } , transaction: t })
        res.send({"dealerResult" : result})
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'Submit', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

        await t.commit();
    } catch (e) {
        await t.rollback();
        console.error(e);
        next(createError.InternalServerError());
        logController.addAuditLog( req.payload.user_id, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'Submit', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    }
}

exports.getALLGeneratedInvoiceLists = async(req,res) => {
    try {
        const queryText = `SELECT a."DemonstrationId",a."Permit_NO" , a."InvoiceNo" , a."FarmerId", a."FarmerName" , a."Farmer_Category" , a."LandArea",
        SUM(cast(a."totalPrice" as int)) AS "TotalPrice", SUM(cast(a."eligibleSubsidy" as int)) AS "EligibleSubsidy" ,
        b."baoAction" , b."ddaAction" from "DealerSale" a
        LEFT JOIN "DealerSaleToAction" b on b."InvoiceNo" = a."InvoiceNo"
        WHERE a."SoldOn" :: Date = '${req.query.Date}':: Date AND a."SoldBy" = '${req.payload.userName}'
        group by a."InvoiceNo" , a."DemonstrationId", a."Permit_NO" , a."FarmerId", a."FarmerName" ,a."Farmer_Category" ,
        a."LandArea", b."baoAction" , b."ddaAction"`
        const result = await db.sequelize.query(queryText); 
        res.send(result[0])
    } catch (e) {
        res.status(500).send('Unexpected error')
        console.error(e);
    }
}

exports.getInputDetails = async(req,res) => {
     try {

        const InvoiceNo = req.query.InvoiceNo == '' ? 0 : req.query.InvoiceNo
        const queryText = `SELECT a."InvoiceNo", a."Permit_NO" , a."DemonstrationId" ,a."FarmerId" ,a."LandArea",b."ItemName", a."Technical_Name",
                           a."totalPrice", a."eligibleSubsidy", a."verifyStatus",a."ItemId",a."Technical_Code"
                           FROM "DealerSale" a
                           INNER JOIN "ItemMaster" b on a."ItemId" = b."ItemId" AND a."CompId" = b."CompId"
                           WHERE a."FarmerId" = '${req.query.FarmerId}' AND (a."InvoiceNo" = '${InvoiceNo}' or '${InvoiceNo}'='0')`
        const result = await db.sequelize.query(queryText); 
        res.send(result[0])
     } catch (e) {
        res.status(500).send('Unexpected error')
        console.error(e);
     }
}

exports.deleteInvoice = async(req,res) => {
     try {
        const queryText = `DELETE FROM "DealerSale"
                           WHERE "InvoiceNo" = '${req.query.InvoiceNo}'
                           AND "FarmerId" = '${req.query.FarmerId}'
                           AND "Fin_year" = '${req.query.Fin_year}'
                           AND "ItemId" = '${req.query.ItemId}'
                           AND "Technical_Code" IN (
                           SELECT "Technical_Code"
                           FROM "DealerSale"
                           WHERE  "FarmerId" = '${req.query.FarmerId}' AND "InvoiceNo" = '${req.query.InvoiceNo}'
                           AND "ItemId" = '${req.query.ItemId}'
                           AND "Technical_Code" = '${req.query.Technical_Code}'
                           AND "Fin_year" = '${req.query.Fin_year}'
                           AND "verifyStatus" = 'NotVerified'
                           LIMIT 1
                           )`
        const result = await db.sequelize.query(queryText); 

        const queryText1 = `SELECT exists (SELECT 1 FROM "DealerSale" WHERE "InvoiceNo" = '${req.query.InvoiceNo}' LIMIT 1)`
        const result1 = await db.sequelize.query(queryText1); 

        if(result1[0][0].exists == true) return res.send(result[0])

        const queryText2 = `DELETE FROM "DealerSaleToAction" WHERE "InvoiceNo" = '${req.query.InvoiceNo}'`
        const result2 = await db.sequelize.query(queryText2); 

        res.send({message :" Deleted Succesfully."})
     } catch (e) {
        res.status(500).send('Unexpected error')
        console.error(e);
     }
}