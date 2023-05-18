const express = require('express');
const router = express.Router();
adoController = require('../controllers/ado.controller')
module.exports = router;



router.get('/getBlocks', adoController.getBlocks);
router.get('/getAllDealerSale', adoController.getAllDealerSale);
router.get('/getDealerSaleReciept', adoController.getDealerSaleReciept);
router.get('/getVAWSaleReciept',adoController.getVAWSaleReciept);
router.post('/forwardDealerSale', adoController.forwardDealerSale);






