const router = require('express').Router();
module.exports = router;
const dealerBal = require('../controllers/dealer.controller')
module.exports = router;

router.get('/getBlocks' , dealerBal.getBlocks);
router.get('/getDemonstrationId' , dealerBal.getDemonstrationId);
router.get('/getDistrictPrefix' , dealerBal.getDistrictPrefix);
router.get('/getPermitList' , dealerBal.getPermitList);
router.get('/getItems', dealerBal.getItems);
router.get('/getTechnicalName', dealerBal.getTechnicalName);
// router.get('/getEligibleTechnicalName' , dealerBal.getEligibleTechnicalName);
router.get('/getPurchasedTechnicalName' , dealerBal.getPurchasedTechnicalName);
router.get('/getItemPrice' , dealerBal.getItemPrice);
router.post('/submitDealerSale' , dealerBal.submitDealerSale);
router.get('/getALLGeneratedInvoiceLists' , dealerBal.getALLGeneratedInvoiceLists);
router.get('/getInputDetails' , dealerBal.getInputDetails);
router.get('/deleteInvoice' , dealerBal.deleteInvoice);