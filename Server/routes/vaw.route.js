const express = require('express');
const router = express.Router();
vawController = require('../controllers/vaw.controller')

router.get('/getDemonstrationData', vawController.getDemonstrationData);
router.get('/getDistrictPrefix', vawController.getDistrictPrefix);
router.get('/checkFarmerRegistredOrNot', vawController.checkFarmerRegistredOrNot);
router.post('/SubmitfarmerDetails', vawController.SubmitfarmerDetails);
router.get('/getAllFarmerList', vawController.getAllFarmerList);
router.get('/getAllApprovedFarmerList', vawController.getAllApprovedFarmerList);
router.get('/ConfirmSeedDistributionStatus', vawController.ConfirmSeedDistributionStatus);
router.get('/getTotalLandCount', vawController.getTotalLandCount);
router.get('/getTotalSeedCount', vawController.getTotalSeedCount);
router.get('/getAllFarmerDetails', vawController.getAllFarmerDetails);
// router.put('/UpdateFarmerDetails', vawController.UpdateFarmerDetails);
router.get('/DeleteFarmerDetails', vawController.DeleteFarmerDetails);
router.post('/FinalSubmitfarmerDetails', vawController.FinalSubmitfarmerDetails);
router.get('/getDemonstrationIdCount', vawController.getDemonstrationIdCount);
router.get('/getDemonstrationReport', vawController.getDemonstrationReport);
router.get('/getCalculatedInputCost',vawController.getCalculatedInputCost);
router.get('/getCalculatedIncentiveCost',vawController.getCalculatedIncentiveCost);












module.exports = router;