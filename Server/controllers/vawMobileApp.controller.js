const { db, sequelize } = require('../config/config');
const UserModel = require('../models/User.model');
// const logController = require('./log.controller');
const requestIP = require('request-ip');
const UAParser = require('ua-parser-js');
const parser = new UAParser();
const createError = require('http-errors');



exports.getUserDetailsByUserId = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await UserModel.findOne({ where: { user_id: user_id }, raw: true });
            resolve(response);
        } catch (e) {
            reject(e);
        }
    })
}

exports.getDemonstrationList = async (userId, req, res, next) => {
    try {
        const queryText = `SELECT a."DemostrationId",a."AddedOn",a."Dist_Code",a."Block_Code",a."Gp_Code", e."Dist_Name", c."Block_Name",
        a."Demonstration_Area",a."schemeId",a."CompId",a."bp_ItemId",a."CropId",a."SubCropId",a."Variety_Code",
        a."vaw_userId",a."Added_By",a."Fin_Year",a."SeedDistributionStatus",a."SeedDistributedOn",a."SeedDistributedBy",
        a."IPAddress",a."updatedAt",a."BP_SubCropId",a."BP_Variety_Code",
        COUNT(b."FarmerId") fILTER (WHERE b."Status"= 1) AS totalFarmerInvolved  
        FROM "DemonstrationPatchMaster" a 
        LEFT JOIN "Farmer_Permit" b ON  a."DemostrationId" = b."DemonstrationId"
        INNER JOIN "LGDistricts" e ON a."Dist_Code" = e."Dist_Code"
        INNER JOIN "LGBlocks" c ON a."Block_Code" = c."Block_Code"
        WHERE a."vaw_userId" = '${userId}' 
        GROUP BY a."DemostrationId",a."AddedOn",a."Dist_Code",a."Block_Code",a."Gp_Code", e."Dist_Name", c."Block_Name",a."Demonstration_Area",a."schemeId",a."CompId",a."bp_ItemId",a."CropId",a."SubCropId",a."Variety_Code",a."vaw_userId",a."Added_By",a."Fin_Year",a."SeedDistributionStatus",a."SeedDistributedOn",a."SeedDistributedBy",a."IPAddress",a."updatedAt",a."BP_SubCropId",a."BP_Variety_Code";`
        const result = await db.sequelize.query(queryText);
        const data = result[0]
        data.forEach(e => {
            e.modifiedDate = e.AddedOn.toLocaleDateString('pt-PT').replace('/', '-').split('T')[0].replace('/', '-');
        })
        return (data);
    } catch (e) {
        console.error(e);
        return (false)
        // next(createError.InternalServerError());

    }
}

exports.getGpName = async (req, res) => {
    try {
        const queryText = `SELECT "Gp_Code","DemostrationId" FROM "DemonstrationPatchMaster" WHERE "vaw_userId"='${req.query.userId}'`
        const result = await db.sequelize.query(queryText);
        const GpData = []
        result[0].forEach(async(e, key) => {
            var GPCode = e.Gp_Code.split(',')
            GPCode.forEach(async(y, key1) => {
                const queryText1 = `SELECT "Gp_Code" , "Gp_Name" FROM "LGGP" WHERE "Gp_Code" = '${y}';`
                const result1 = await db.sequelize.query(queryText1);
                result1[0][0].DemostrationId = e.DemostrationId;
                GpData.push(result1[0][0]);
                if(key+1==result[0].length){
                    if (key1+1==GPCode.length) {
                        res.send(GpData);
                    }
                }
                
            });
        })
    } catch (e) {
        res.status(500).send('Unexpected error');
        console.error(e);

    }
}


exports.getAllFarmerList = async (req, res, next) => {
    try {
        const queryText = `SELECT * FROM "Farmer_Permit" WHERE "Status" = 1 `
        const result = await db.sequelize.query(queryText);
        return (result[0]);
    } catch (e) {
        console.error(e);
	return(false);
        next(createError.InternalServerError());

    }
}

exports.SubmitPhase1LandDetails = async (data, userId, req, res, next) => {
    try {
        const Data = data
        const UserId = userId
        const promiseArray1 = []
        const promiseArray2 = []
        // console.log(token);
        if (Data.length != 0) {
            Data.forEach(async (e,key) => {
                if (e.statusPhase1 == 'Completed' && e.statusPhase2 == 'Pending' && e.statusPhase3 == 'Pending') {
                    // console.log("Phase 1 api heated");
                    const queryText = `SELECT * FROM "FarmerLandDetails" WHERE  "DemostrationId"= '${e.DemostrationId}'`
                    const FarmerTable = await db.sequelize.query(queryText);
                    if (FarmerTable[0].length == 0) {
                        e.SyncedOnPhase1 = Date()
                        SavedLandPhase1Details = db.farmerLand.create(e)
                        promiseArray1.push(SavedLandPhase1Details)
                    }
                    else{
                        console.log("Data Has Already Existed");

                    }

                } else if (e.statusPhase1 == 'Completed' && e.statusPhase2 == 'Completed' && e.statusPhase3 == 'Pending') {
                    // console.log("Phase 2 api heated");
                    const obj = {
                        toDate: e.toDate,
                        SyncedOnPhase2: Date(),
                        LandPhoto1Phase2: e.LandPhoto1Phase2,
                        LandPhoto2Phase2: e.LandPhoto2Phase2,
                        LandPhoto3Phase2: e.LandPhoto3Phase2,
                        Latitude1Phase2: e.Latitude1Phase2,
                        Longitude1Phase2: e.Longitude1Phase2,
                        Latitude2Phase2: e.Latitude2Phase2,
                        Longitude2Phase2: e.Longitude2Phase2,
                        Latitude3Phase2: e.Latitude3Phase2,
                        Longitude3Phase2: e.Longitude3Phase2,
                        statusPhase2: e.statusPhase2
                    }

                    const queryText1 = `SELECT * FROM "FarmerLandDetails" WHERE  "DemostrationId"= '${e.DemostrationId}' AND "statusPhase1" = 'Completed' AND "statusPhase2" = 'Completed'`
                    const FarmerData = await db.sequelize.query(queryText1);
                    // const FarmerData = await db.farmerLand.findOne({ where: { DemostrationId: e.DemostrationId, statusPhase1 : 'Completed' , statusPhase2 : 'Completed' }, raw: true })
                    
                    if (FarmerData[0].length == 0) {
                        updateLandPhase2Details = db.farmerLand.update(obj, { where: { DemostrationId: e.DemostrationId } });
                        promiseArray1.push(updateLandPhase2Details)
                    }
                    else{
                        console.log("Data Has Already Existed");
                    }
                    
                } else if (e.statusPhase1 == 'Completed' && e.statusPhase2 == 'Completed' && e.statusPhase3 == 'Completed') {
                    const obj1 = {
                        SyncedOnPhase3: Date(),
                        documentationTakenUp: e.documentationTakenUp,
                        organisingFieldDay: e.organisingFieldDay,
                        attendedFarmers: e.attendedFarmers,
                        AverageCCresult: e.AverageCCresult,
                        LandPhoto1Phase3: e.LandPhoto1Phase3,
                        LandPhoto2Phase3: e.LandPhoto2Phase3,
                        LandPhoto3Phase3: e.LandPhoto3Phase3,
                        Latitude1Phase3: e.Latitude1Phase3,
                        Longitude1Phase3: e.Longitude1Phase3,
                        Latitude2Phase3: e.Latitude2Phase3,
                        Longitude2Phase3: e.Longitude2Phase3,
                        Latitude3Phase3: e.Latitude3Phase3,
                        Longitude3Phase3: e.Longitude3Phase3,
                        statusPhase3: e.statusPhase3
                    }
                    const queryText1 = `SELECT * FROM "FarmerLandDetails" WHERE  "DemostrationId"= '${e.DemostrationId}' AND "statusPhase1" = 'Completed' AND "statusPhase2" = 'Completed' AND "statusPhase3" = 'Completed'`
                    const FarmerData1 = await db.sequelize.query(queryText1);
                    // const FarmerData1 = await db.farmerLand.findOne({ where: { DemostrationId: e.DemostrationId, statusPhase1 : 'Completed' , statusPhase2 : 'Completed',statusPhase3 : 'Completed' }, raw: true })
                    if (FarmerData1[0].length == 0) {
                        updateLandPhase3Details = db.farmerLand.update(obj1, { where: { DemostrationId: e.DemostrationId } });
                        promiseArray1.push(updateLandPhase3Details)
                    }
                } else {
                    console.log("api not heated");
                }
                if (key+1==Data.length) {
                    console.log(key+1,Data.length);
                 }
            });
            // console.log('result1',result1);
            // const queryText = `SELECT "DemostrationId","SyncedOnPhase1","SyncedOnPhase2","SyncedOnPhase3","statusPhase1","statusPhase2","statusPhase3","vaw_userId"
            // FROM public."FarmerLandDetails" WHERE "vaw_userId" = '${userId}'`
            // const landDetailsresult = await db.sequelize.query(queryText);
            // console.log('landDetailsresult',landDetailsresult[0]);
            const result1 = await Promise.all(promiseArray1)
            return ({ message: `Successfully Synchronized.` });
        } else {
            console.log(`records are Blank`);
            return 0;
        }
    } catch (e) {
        console.error(e);
        return(false);
        // next(createError.InternalServerError());
    }

}

exports.getAllFarmerLandDetails = async (userId, req, res, next) => {
    try {
        const queryText = `SELECT "DemostrationId","SyncedOnPhase1","SyncedOnPhase2","SyncedOnPhase3","statusPhase1","statusPhase2","statusPhase3","vaw_userId"
        FROM public."FarmerLandDetails" WHERE "vaw_userId" = '${userId}'`
        const result = await db.sequelize.query(queryText);
        const data = result[0]
        data.forEach(e => {
            // var event = new Date(e.SyncedOnPhase1);
            // var date = JSON.stringify(event)
            // e.date = date.slice(1, 11)
            e.date = e.SyncedOnPhase1.toLocaleDateString('pt-PT').replace('/', '-').split('T')[0].replace('/', '-');
        })
        return (data);
    } catch (e) {
        console.error(e);
	return (false)
        next(createError.InternalServerError());
    }
}


