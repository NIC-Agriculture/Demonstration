const { db , sequelize } = require('../config/config');
const UserModel = require('../models/User.model');
// const logController = require('./log.controller');
const requestIP = require('request-ip');
const UAParser = require('ua-parser-js');
const parser = new UAParser();
const createError = require('http-errors');

exports.getUserDetailsByUserId = (user_id) => {
    return new Promise( async (resolve, reject) => {
        try {
            let response = await UserModel.findOne({ where: { user_id: user_id}, raw: true });
            // console.log(response);
            resolve(response);
        } catch (e) {
            reject(e);
        }
    })
}

exports.getBlocks = async (req, res, next) => {
    try {
         const queryText = `SELECT   a."DistrictCode" , a."BlockCode" , b."Block_Name" 
                            FROM "ADODistBlockMapping" a 
                            INNER JOIN "LGBlocks" b ON a."BlockCode" = b."Block_Code"
                            WHERE a."ADOCode" = '${req.payload.user_id}'`
         const result = await db.sequelize.query(queryText);
         res.send(result[0]);
    } catch (e) {
        console.log(e);
        next(createError.InternalServerError())
    }
}
exports.getAllDealerSale = async (req, res, next) => {
    try {

       
         const queryText = ` SELECT a."InvoiceNo", a."DemonstrationId" , a."Permit_NO" , a."FarmerId" ,
         a."Farmer_Category",a."dealerLiscenseNo",a."SoldBy" , a."SoldOn" , a."FarmerName",
         SUM(cast(a."totalPrice" as int)) AS TotalSalePrice , 
         SUM(cast(a."eligibleSubsidy" as int)) AS TotalEligibleSubsidy
         FROM "DealerSale" a
         where a."verifyStatus" = 'NotVerified' and a."Block_Code" = '${req.query.Block_Code}'
         GROUP BY a."InvoiceNo", a."DemonstrationId" , a."Permit_NO" ,  a."FarmerId" , a."Farmer_Category",a."dealerLiscenseNo",
         a."SoldBy" , a."SoldOn" , a."FarmerName" `
         const result = await db.sequelize.query(queryText);
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

exports.forwardDealerSale = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const data = req.body
        const t = await sequelize.transaction();
        const promiseArray = []
        const ADOdata = {
            adoAction : 'Forwarded',
            ado_UserId : req.payload.user_id,
            adoTime : Date()
         }

         data.forEach(e => {
            const udpateData = db.dealerSaleAction.update( ADOdata , { where: { InvoiceNo: e.InvoiceNo } , transaction: t })
            // console.log(udpateData);
            promiseArray.push(udpateData)
        });
       
        const result = await Promise.all(promiseArray)
        res.send({ message:"Successfully Forwarded to CDAO." })
        await t.commit();
    } catch (e) {
        await t.rollback();
        console.log(e);
        next(createError.InternalServerError())
    }
}
