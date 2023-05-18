const router = require('express').Router();
module.exports = router;
dafeController = require('../controllers/dafe.controller')

router.get('/detailedProgressReport', dafeController.detailedProgressReport )
router.get('/schemeBeneficiaryData', dafeController.schemeBeneficiaryData )