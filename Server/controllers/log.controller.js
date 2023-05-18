const { db , sequelize} = require('../config/config');
const UAParser = require('ua-parser-js');
const parser = new UAParser();
const createError = require('http-errors');

const LogModel = require('../models/ActivityLog.model');

getCurrentFinYear = () => {
    return new Promise(resolve => {
        var year = new Date().getFullYear().toString();
        var month = new Date().getMonth();
        var finYear = month >= 3 ? year + "-" + (parseInt(year.slice(2, 4)) + 1).toString() : (parseInt(year) - 1).toString() + "-" + year.slice(2, 4);
        resolve(finYear);
    })
}

exports.addAuditLog = async (userId, reqUrl , status , route , action , method , ip , os , osVersion , bName, bVersion , deviceType) => {
    try {
        let finYear = await getCurrentFinYear();
        const data = {
            IPAddress: ip,
            user_id: userId ,
            URL: reqUrl, 
            DeviceType: deviceType,
            OS: os,
            Os_Version : osVersion,
            Browser_name: bName,
            Browser_version: bVersion,
            DateTime: new Date(),
            Action: action,
            Method: method,
            Fin_Year: finYear, 
            Status: status, 
            route: route,
        }
        await LogModel.create(data);      
    } catch (e) { 
        console.error(e);
    }
}