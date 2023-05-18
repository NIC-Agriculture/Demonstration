const { db , sequelize} = require('../config/config');
const logController = require('./log.controller');
const requestIP = require('request-ip');
const UAParser = require('ua-parser-js');
const parser = new UAParser();
const createError = require('http-errors');

exports.detailedProgressReport = async (req,res) => {
    try{
        // https://odishaagridemo.nic.in/dafe/detailedProgressReport?FinYear=2022-23&DistCode=361&schemeId=3&season=Kharif

        const schemeId = req.query.schemeId == '1' ? 'scheme_1' : req.query.schemeId == '2' ? 'scheme_2' : 'scheme_3' ;

        const queryText = `SELECT a."Dist_Code", a."Block_Code" , b."schemeName" , c."SubschemeName" , c."Season" , d."CompName" ,
        (COALESCE(a."TotalPhyGen",0) + COALESCE(a."TotalPhySCP",0) + COALESCE(a."TotalPhyTASP",0)) AS "Target", 'ha' AS unit,
        (COALESCE(a."DistributedPhyGen",0) + COALESCE(a."DistributedPhySCP",0) + COALESCE(a."DistributedPhyTASP",0)) AS "Achievement",
        COUNT(e."FarmerId") AS "no_BeneficiariesTagged",
        (a."TotalPhyGen" + a."TotalPhySCP" + a."TotalPhyTASP")* a."Total_Cost" AS "Actual Fund Allocated by State (in Lakh)",
        (COALESCE(a."DistributedPhyGen",0) + COALESCE(a."DistributedPhySCP",0) + COALESCE(a."DistributedPhyTASP",0)) * a."Total_Cost" AS "ExpenditureReleased (in Lakhs)",     
        (SUM(cast((COALESCE(f."totalEligibleIncentive", '0')) as numeric)) + SUM(cast((COALESCE(g.totaleligiblesubsidy, '0')) as numeric))) AS Expenditure
        FROM "BlockTarget" a 
        INNER JOIN "SchemeMaster" b ON b."schemeId" = a."schemeId"
        INNER JOIN "SubSchemeMaster" c ON c."SubschemeId" = a."SubschemeId"
        INNER JOIN "ComponentMaster" d ON d."CompId" = a."CompId"
        LEFT JOIN "Farmer_Permit" e ON e."CompId" = a."CompId" AND e."schemeId" = a."schemeId" AND e."Block_Code" = a."Block_Code"
        LEFT JOIN "InctvPaymentMaster" f ON f."schemeId" = a."schemeId" and f."Permit_NO" = e."Permit_NO"
        LEFT JOIN "PaymentMaster" g ON g."schemeId" = a."schemeId" and g."Permit_NO" = e."Permit_NO"
        WHERE a."Fin_Year" = '${req.query.FinYear}' AND
        a."Dist_Code" = '${req.query.DistCode}' AND a."schemeId" = '${schemeId}' AND c."Season" in ('${req.query.season}' , 'Kharif & Rabi' )
        GROUP BY a."Dist_Code", a."Block_Code" , b."schemeName" , c."SubschemeName" , d."CompName",a."TotalPhyGen", a."TotalPhySCP",a."TotalPhyTASP",
        a."DistributedPhyGen", a."DistributedPhySCP", a."DistributedPhyTASP", a."Total_Cost" , c."Season"`
        const result = await db.sequelize.query(queryText);
        // console.log(queryText);
        res.send(result[0])
    } catch (e){
        res.status(500).send('Unexpected error');
        console.error(e);
    }
}

exports.schemeBeneficiaryData = async (req,res) => {
    try {

        // URL  https://odishaagridemo.nic.in/dafe/schemeBeneficiaryData?FinYear=2022-23&schemeId=1&DistCode=344

         const schemeId = req.query.schemeId == '1' ? 'scheme_1' : req.query.schemeId == '2' ? 'scheme_2' : 'scheme_3' ;

         const queryText = `SELECT a."Dist_Code", a."Block_Code" , a."DemonstrationId" AS "demo_id", b."schemeName" , c."SubschemeName", c."Season" , d."CompName" ,
         a."FarmerName" , a."MobileNo" , e."Latitude1Phase1" AS "Latitude", e."Longitude1Phase1" AS "Longitude"
         FROM "Farmer_Permit" a  
         INNER JOIN "SchemeMaster" b ON b."schemeId" = a."schemeId"
         INNER JOIN "SubSchemeMaster" c ON c."schemeId" = a."schemeId"
         INNER JOIN "ComponentMaster" d ON d."CompId" = a."CompId"
         INNER JOIN "FarmerLandDetails" e ON e."DemostrationId" = a."DemonstrationId"
         WHERE a."Fin_year" = '${req.query.FinYear}' AND a."schemeId" = '${schemeId}' AND a."Dist_Code" = '${req.query.DistCode}'`
         const result = await db.sequelize.query(queryText);
         res.send(result[0])
    } catch (e) {
        
    }

}									