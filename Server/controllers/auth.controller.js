const UserModel = require('../models/User.model');
// const logBal = require('./log.controller');

var requestIP = require('request-ip');
var UAParser = require('ua-parser-js');
var parser = new UAParser();
var path = require('path');
const createError = require('http-errors');

const { sequelize, db } = require('../config/config');

exports.getUserDetails = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await UserModel.findOne({ where: { user_id: user_id }, raw: true });
            resolve(response);
        } catch (e) {
            reject(e);
        }
    })
}

exports.checkUserPemission = (req, res, next) => {
    if (req.params.Role == req.payload.userRole) {
        return res.send(true);
    } else {
        return res.status(403).send(false);
    }
}

exports.changePassword = async (req, res, next) => {
    try {
        const queryText = `SELECT * FROM public.users where user_id='${req.payload.user_id}'`
        const result = await db.sequelize.query(queryText);
        if (result[0][0].password == req.body.oldPassword) {
            const queryText = `update users set password='${req.body.newPassword}' where user_id='${req.payload.user_id}'`
            const result = await db.sequelize.query(queryText);
            res.send({ message: "Password Changed Successfully" })
        } else {
            res.send({ message: "Old Password Mismatch" })
        }


        // const userList = await db.UsersModel.findOne({ where: { user_id: req.payload.user_id }, raw: true })
        // console.log(userList);
        // updatePassword = db.UsersModel.update(password,{where:{user_id: req.payload.user_id}})

    } catch (e) {
        console.error(e);
        next(createError.InternalServerError());

    }
}

exports.getAllDistrictReport = async (req,res) => {
    try{
        const queryText1 = `SELECT b."Dist_Code", b."Dist_Name" ,d."schemeName" , 
        COUNT(distinct a."DemostrationId") as "DemoIDCount",
        COUNT(c."FarmerId") AS "TotalFarmerCount" , 
        SUM(CASE WHEN c."Farmer_Category"  = 'General' THEN 1 ELSE 0 END) as "GenFarmer",
        SUM(CASE WHEN c."Farmer_Category"  = 'SC' THEN 1 ELSE 0 END) as "SCFarmer",
        SUM(CASE WHEN c."Farmer_Category"  = 'ST' THEN 1 ELSE 0 END) as "STFarmer"
        FROM "DemonstrationPatchMaster" a 
        INNER JOIN "LGDistricts" b ON b."Dist_Code" = a."Dist_Code"
        LEFT JOIN "Farmer_Permit" c ON c."DemonstrationId" = a."DemostrationId"
        INNER JOIN "SchemeMaster" d ON d."schemeId" = a."schemeId"
        WHERE a."Fin_Year"='${req.query.Fin_Year}'
        GROUP BY b."Dist_Name" ,d."schemeName",b."Dist_Code"`
         const result = await db.sequelize.query(queryText1);
         res.send(result[0]);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.getAllBlockReport = async (req,res) => {
    try{
        const queryText1 = `SELECT e."Block_Name",d."schemeName" ,
        COUNT(distinct a."DemostrationId") as "DemoIDCount",
        COUNT(c."FarmerId") AS "TotalFarmerCount" ,
        SUM(CASE WHEN c."Farmer_Category"  = 'General' THEN 1 ELSE 0 END) as "GenFarmer",
        SUM(CASE WHEN c."Farmer_Category"  = 'SC' THEN 1 ELSE 0 END) as "SCFarmer",
        SUM(CASE WHEN c."Farmer_Category"  = 'ST' THEN 1 ELSE 0 END) as "STFarmer"
        FROM "DemonstrationPatchMaster" a
        INNER JOIN "LGDistricts" b ON b."Dist_Code" = a."Dist_Code"
	    INNER JOIN "LGBlocks" e ON e."Block_Code" = a."Block_Code"
        LEFT JOIN "Farmer_Permit" c ON c."DemonstrationId" = a."DemostrationId"
        INNER JOIN "SchemeMaster" d ON d."schemeId" = a."schemeId"
	    WHERE  b."Dist_Name"='${req.query.distName}' AND a."Fin_Year"='${req.query.Fin_Year}'
	    GROUP BY e."Block_Name",d."schemeName"`

        const result = await db.sequelize.query(queryText1);
        res.send(result[0]);
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}