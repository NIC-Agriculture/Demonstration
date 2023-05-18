const { db , sequelize } = require('../config/config');
const UserModel = require('../models/User.model');
const requestIP = require('request-ip');
const UAParser = require('ua-parser-js');
const parser = new UAParser();
const createError = require('http-errors');


exports.getDistrictSeedReport = async (req, res , next) => {
    try {
        const queryText = `SELECT a."Dist_Code", a."Block_Code", a."DemostrationId", b."Block_Name" ,c."CompName",
        COUNT(d."FarmerId") AS totalFarmerInvolved ,
        SUM(d."LandArea") AS totalLand,e."SubCropName",f."Variety_Name",ee."SubCropName" AS bpsubcropname,
        ff."Variety_Name" AS bpcropvarietyname ,g."Seed_Per_ha", g."Unit" , 
        g."Seed_Per_ha" * SUM(d."LandArea") AS totalSeedRequired,
        h."itemPackageSize" , h."IndicativeCost" AS BPSeedCost, h."unit" AS bpUnit,
        CAST(h."itemPackageSize" as int) * SUM(d."LandArea") AS totalBPSeedRequired
        FROM  "DemonstrationPatchMaster" a
        INNER JOIN "LGBlocks" b ON a."Block_Code" = b."Block_Code"
        INNER JOIN "ComponentMaster" c ON a."CompId" = c."CompId"
        INNER JOIN "Farmer_Permit" d ON a."Dist_Code" = d."Dist_Code"
        INNER JOIN "SubCropMaster" e ON a."SubCropId" = e."SubCropId"
        INNER JOIN "CropVarietyMaster" f ON a."Variety_Code" = f."Variety_Code"
        INNER JOIN "SubCropMaster" ee ON a."BP_SubCropId" = ee."SubCropId"
        INNER JOIN "CropVarietyMaster" ff ON a."BP_Variety_Code" = ff."Variety_Code"
        INNER JOIN "ComponentCostMapping" g ON a."CompId" = g."CompId"
        INNER JOIN "itemPackageMaster" h ON a."bp_ItemId" = h."ItemId"
        WHERE a."Dist_Code" = '${req.query.Dist_Code}' GROUP BY a."Dist_Code" , a."Block_Code",
        a."DemostrationId",b."Block_Name",c."CompName", e."SubCropName",f."Variety_Name",g."Seed_Per_ha" ,
         g."Unit" ,ee."SubCropName",ff."Variety_Name", h."itemPackageSize" , h."IndicativeCost",h."unit" `
        const result = await db.sequelize.query(queryText);
        res.send(result[0]);
    } catch (e) {
        console.error(e);
        next(createError.InternalServerError());

    }
}