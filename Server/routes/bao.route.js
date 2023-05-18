const router = require('express').Router();
module.exports = router;
const baoController = require('../controllers/bao.controller')
module.exports = router;

router.get('/getGPs', baoController.getGPs);
router.get('/assignVAW', baoController.assignVAW);
router.get('/getBlockTarget', baoController.getBlockTarget);
router.post('/SubmitDemonstrationPatch', baoController.SubmitDemonstrationPatch);
router.get('/getAllScheme', baoController.getAllScheme); 
router.get('/getSubscheme', baoController.getSubscheme); 
router.get('/getComponent', baoController.getComponent); 
router.get('/getDemonstrationData', baoController.getDemonstrationData);
router.get('/getVerifiedDemonstrationData', baoController.getVerifiedDemonstrationData);
router.get('/getItemDetails', baoController.getItemDetails);
router.get('/getAllFarmerList', baoController.getAllFarmerList);
router.get('/confirmDemonstrationPatch', baoController.confirmDemonstrationPatch);
router.get('/getAllDealerSale', baoController.getAllDealerSale);
router.post('/confirmDealerSale', baoController.confirmDealerSale);
router.get('/getDealerSaleReciept', baoController.getDealerSaleReciept);
router.get('/getVAWSaleReciept',baoController.getVAWSaleReciept);
router.get('/getAvailableTarget',baoController.getAvailableTarget);
router.get('/getclusterDemonstration',baoController.getclusterDemonstration);
router.get('/getWardData',baoController.getWardData);
router.get('/getDemonstrationIdCount',baoController.getDemonstrationIdCount);
router.get('/getSeedDistributionStatus',baoController.getSeedDistributionStatus);
router.post('/returnBackToVAW',baoController.returnBackToVAW);
router.get('/getDemonstrationStatusReport',baoController.getDemonstrationStatusReport);
router.get('/fieldDemonstrationIdPhaseDetails',baoController.fieldDemonstrationIdPhaseDetails);
router.get('/getFieldDemonstrationPhotos',baoController.getFieldDemonstrationPhotos);
router.get('/deleteDemoID', baoController.deleteDemoID)
router.get('/getCalculatedInputCost',baoController.getCalculatedInputCost);
router.get('/getCalculatedIncentiveCost',baoController.getCalculatedIncentiveCost);

router.get('/getEligibleDemonstrationData', baoController.getEligibleDemonstrationData);
router.get('/getAllFarmerTrapData',baoController.getAllFarmerTrapData);
router.post('/submitTrapsData', baoController.submitTrapsData);
router.post('/updateTrapsData', baoController.updateTrapsData);
router.get('/getDemoIDToBeConfirmed', baoController.getDemoIDToBeConfirmed);
router.get('/confirmTrapsData', baoController.confirmTrapsData);
