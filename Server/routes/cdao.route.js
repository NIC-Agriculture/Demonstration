const express = require('express');
const router = express.Router();
cdaoController = require('../controllers/cdao.controller')

router.get('/getBlocks', cdaoController.getBlocks);
router.get('/getAllScheme', cdaoController.getAllScheme);
router.get('/getSubscheme', cdaoController.getSubscheme);
router.get('/getComponent', cdaoController.getComponent);
router.get('/getComponentCost', cdaoController.getComponentCost);
router.get('/getItems', cdaoController.getItems);
router.get('/getbpItems', cdaoController.getbpItems);
router.get('/getTechnicalName', cdaoController.getTechnicalName);
router.get('/getCrops', cdaoController.getCrops);
router.get('/getAllbpSubCrop', cdaoController.getAllbpSubCrop);
router.get('/getSubCrop', cdaoController.getSubCrop);
router.get('/getCropVariety', cdaoController.getCropVariety);
router.get('/getBPCropVariety', cdaoController.getBPCropVariety);
router.get('/getDistrictTarget', cdaoController.getDistrictTarget);
router.get('/getblockTargetData', cdaoController.getblockTargetData);
router.post('/SubmitBlockTarget', cdaoController.SubmitBlockTarget);
router.post('/UpdateBlockTarget', cdaoController.UpdateBlockTarget);
router.get('/getAllDealerSale', cdaoController.getAllDealerSale);
router.get('/getDealerSaleReciept', cdaoController.getDealerSaleReciept);
router.get('/getVAWSaleReciept',cdaoController.getVAWSaleReciept);
router.post('/approveDealerSale', cdaoController.approveDealerSale);
router.get('/getBlockWiseSeedReport', cdaoController.getBlockWiseSeedReport);
router.get('/getReferenceIDs', cdaoController.getReferenceIDs);
router.get('/generatePaymntFile', cdaoController.generatePaymntFile);
router.get('/getIncetiveList', cdaoController.getIncetiveList);
router.post('/approveIncentiveList', cdaoController.approveIncentiveList);
router.post('/returnDealerSaleToBAO', cdaoController.returnDealerSaleToBAO);
router.get('/getAllApprovedDealerSale', cdaoController.getAllApprovedDealerSale);
router.get('/getAllReturnedDealerSale', cdaoController.getAllReturnedDealerSale);

router.get('/getCompTargetDetails', cdaoController.getCompTargetDetails);
router.get('/getItemTechDetails', cdaoController.getItemTechDetails);
router.get('/getAvailableTarget', cdaoController.getAvailableTarget);
router.get('/getDemonstrationIdCount', cdaoController.getDemonstrationIdCount);
router.get('/getItemNameAndTechnicalNameReport', cdaoController.getItemNameAndTechnicalNameReport);
router.get('/getclusterDemonstration',cdaoController.getclusterDemonstration);
router.get('/getDemonstrationStatusReport',cdaoController.getDemonstrationStatusReport);
router.get('/getWardData',cdaoController.getWardData);
router.get('/getReferenceIDsForpayment',cdaoController.getReferenceIDsForpayment);
router.get('/getPermitSaleDetails',cdaoController.getPermitSaleDetails);
router.post('/UpdateTransactionDetails',cdaoController.UpdateTransactionDetails);
router.get('/RegeneratePaymntFile',cdaoController.RegeneratePaymntFile);
router.get('/getCropCatagory', cdaoController.getCropCatagory);
router.get('/getCrop', cdaoController.getCrop);
router.post('/AddCropVariety', cdaoController.AddCropVariety);
router.get('/getCalculatedInputCost',cdaoController.getCalculatedInputCost);
router.get('/getCalculatedIncentiveCost',cdaoController.getCalculatedIncentiveCost);
module.exports = router;