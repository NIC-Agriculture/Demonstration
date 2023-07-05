const router = require('express').Router();
const schemeBal = require('../controllers/scheme.controller')
module.exports = router;

router.get('/getFinYear', schemeBal.getCurrentFinYear);
router.get('/getAllDistrict',schemeBal.getAllDistrict);
router.get('/getAllScheme',schemeBal.getAllScheme);
router.get('/getAllSubscheme', schemeBal.getAllSubscheme);
router.get('/getAllComponent', schemeBal.getAllComponent);
router.get('/getSubscheme',  schemeBal.getSubscheme);
router.get('/getComponent', schemeBal.getComponent);
router.get('/getComponentCost', schemeBal.getComponentCost);
router.get('/getAllCrops', schemeBal.getAllCrops)
router.get('/getCrops', schemeBal.getCrops);
router.get('/getAllSubCrops', schemeBal.getAllSubCrops);
router.get('/getSubCrops', schemeBal.getSubCrops);
router.post('/addSubscheme',  schemeBal.addSubscheme);
router.post('/addComponent', schemeBal.addComponent);
router.post('/addCompItemDetails', schemeBal.addCompItemDetails);
router.post('/addItemTechDetails', schemeBal.addItemTechDetails);
router.get('/getAllComponentType',schemeBal.getAllComponentType);
router.get('/getAllDistrictTarget',schemeBal.getAllDistrictTarget);
router.post('/SubmitDistrictTarget', schemeBal.SubmitDistrictTarget);
router.post('/UpdateDistrictTarget', schemeBal.UpdateDistrictTarget);
router.get('/getComponentTypeDetails',schemeBal.getComponentTypeDetails);
router.post('/UpdateComponentCostCropMapping', schemeBal.UpdateComponentCostCropMapping);
router.get('/getComponentCropDetails',schemeBal.getComponentCropDetails);

router.get('/getDemonstrationIdCount',schemeBal.getDemonstrationIdCount);
router.get('/getBlockTarget',schemeBal.getBlockTarget);
router.get('/getBlocks', schemeBal.getBlocks);
router.get('/getclusterDemonstration',schemeBal.getclusterDemonstration);
router.get('/getWardData',schemeBal.getWardData);
router.get('/getCalculatedInputCost',schemeBal.getCalculatedInputCost);
router.get('/getCalculatedIncentiveCost',schemeBal.getCalculatedIncentiveCost);
router.get('/getItemDetails',schemeBal.getItemDetails);
router.get('/getItemCostAndSize',schemeBal.getItemCostAndSize)
router.post('/updateItemDetails',schemeBal.updateItemDetails)
router.get('/complianceReport',schemeBal.complianceReport)
