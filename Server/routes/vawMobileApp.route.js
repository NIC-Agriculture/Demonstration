const router = require('express').Router();
const LandController = require('../controllers/vawMobileApp.controller')
const authController = require('../controllers/auth.controller');
const cdaoController = require('../controllers/cdao.controller');
const sha512 = require('js-sha512');
const sha256 = require('sha256');
module.exports = router;

router.post('/syncData', async (req, res) => {
    const data = req.body
    const data1 = JSON.parse(req.body.data)
    try {
        const result = await cdaoController.checkCDAOAuthentication(req.body.userId);
        const response = {}
        const passHash = sha256(req.body.password);
        console.log('result',result);
        if (result.length == 0) {
            res.send('Invalid Username or Password.');
        } else {
            if (passHash == result.PasswordHash) {
                const vawDetails = {}
                vawDetails.isSuccess = true;
                vawDetails.user_id = result.UserID;
                vawDetails.userRole = result.User_Type;
                vawDetails.userName = result.VAWName;
                vawDetails.message = 'Successfully loggedIn.';
                const syncData = await LandController.SubmitPhase1LandDetails(data1,vawDetails.user_id)
                console.log('syncData',syncData);
                const demonList = await LandController.getDemonstrationList(vawDetails.user_id)
                const farmerList = await LandController.getAllFarmerList();
                if(syncData == 0 || syncData.message=='Successfully Synchronized.'){
                    if(demonList == []){
                       response.message = 'Please complete the seed distribution status on web portal.'
                    }
                    const landDetails = await LandController.getAllFarmerLandDetails(vawDetails.user_id)
                    console.log('landDetails',landDetails);
                    response.syncData = syncData;
                    response.demonList = demonList;
                    response.farmerList = farmerList;
                    response.landDetails = landDetails;
                    response.status='true';
    
                }
                else{
                    response.status='false';
                    console.log('error')
                }
               
            } else {
                response.isSuccess = false;
                response.message = 'Wrong Credential';
	    }
            res.send(response);
      }

    } catch (e) {
        console.error(e);
        res.status(500).send(`Unexpected error`)
        // logController.addAuditLog( req.body.userId, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(),'Submit', req.method , req.socket.remoteAddress , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    }

})

router.get('/getGpName',LandController.getGpName);
