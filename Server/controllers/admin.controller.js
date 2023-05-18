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

