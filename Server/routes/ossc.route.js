const express = require('express');
const router = express.Router();
osscController = require('../controllers/ossc.controller')

router.get('/getDistrictSeedReport', osscController.getDistrictSeedReport);




module.exports = router;