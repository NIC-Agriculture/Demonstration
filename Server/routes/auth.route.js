const express = require('express');
const router = express.Router();
const sha256 = require('sha256');
const sha512 = require('js-sha512');
const crypto = require('crypto');
const format = require('biguint-format');
const requestIP = require('request-ip');
var request = require('request');
const UAParser = require('ua-parser-js');
const parser = new UAParser();
const createError = require('http-errors');
const { signAccessToken, verifyAccessToken } = require('../helpers/jwt.helper');

const logController = require('../controllers/log.controller');
const schemeController = require('../controllers/scheme.controller');
const cdaoController = require('../controllers/cdao.controller');
const baoController = require('../controllers/bao.controller');
const authController = require('../controllers/auth.controller');
const adoController = require('../controllers/ado.controller');
const vawController = require('../controllers/vaw.controller')
const adminController = require('../controllers/admin.controller')


// router.post('/addUserDetails', authController.addUserDetails);


router.post('/signIn', async (req, res) => {
    try {
        const result = await authController.getUserDetails(req.body.userId);
        const response = {}
        if (!result) {

            const userResult = await cdaoController.checkCDAOAuthentication(req.body.userId)
            if (userResult) {
                switch (userResult.User_Type) {
                    case 'DDA':
                        if (req.body.password !== userResult.Password) return res.send({ message: "Wrong Credentials." });
                        const distResult = await cdaoController.getCDAOdistDetails(userResult.NewUsername)
                        response.isSuccess = true;
                        response.user_id = userResult.NewUsername;
                        response.userRole = "CDAO";
                        response.userName = `CDAO ,  ${distResult.Farmer_Dist}`;
                        response.Dist_Code = `${distResult.Dist_code}`;
                        response.message = 'Successfully loggedIn.';
                        var accessToken = await signAccessToken(response);
                        response.token = accessToken;
                        break;
                        
                    case 'BAO' :
                        if (req.body.password !== userResult.Password) return res.send({ message: "Wrong Credentials." });
                        const blockResult = await cdaoController.getBAOblockDetails(userResult.Username)
                        response.isSuccess = true;
                        response.user_id = userResult.Username;
                        response.userRole = userResult.User_Type;
                        response.userName = `BAO , ${blockResult.Block_Name} `;
                        response.Block_Code = `${blockResult.Block_Code}`;
                        response.Dist_Code = blockResult.Dist_Code;
                        response.message = 'Successfully loggedIn.';
                        var accessToken = await signAccessToken(response);
                        response.token = accessToken;
                        break;

                    case 'VAW':
                        if (req.body.password2 !== userResult.PasswordHash) return res.send({ message: "Wrong Credentials." });
                        response.isSuccess = true;
                        response.user_id = userResult.UserID;
                        response.userRole = userResult.User_Type;
                        response.userName = userResult.VAWName;
                        response.Block_Code = userResult.BlockCode;
                        response.Dist_Code = userResult.DistrictCode;
                        response.message = 'Successfully loggedIn.';
                        var accessToken = await signAccessToken(response);
                        response.token = accessToken;
                        break;
                }
                res.send(response)
                logController.addAuditLog( req.body.userId , req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'LogIn', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
               
            } else {
                var appKey = 'JHR788DD42EWD5S5SD45XP5Y';
                const password256 = sha256(req.body.password2 + '123456789');
                const password512 = sha512(req.body.password + '123456789');
                request('https://odishaagrilicense.nic.in/user/validateUser?userid=' + req.body.userId + '&password=' + password256 + '&password1=' + password512 + '&appKey=' + appKey, {
                  json: true
                }, async(err, resp, body) => {
                    try {
                        if(resp === undefined) return res.send({message : `There is some server issue.Try again later.`})
                        const errorMessage = ['No user found', 'Login Failed', 'No License Found']
                        if (errorMessage.includes(resp.body[0].result)) {
                            response.message = resp.body[0].result
                            // response.message ='No Fertilizer Retailer / Insecticides Dealer License Found'
                            // console.log(resp.body[0].result);
                            logController.addAuditLog( req.body.userId, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(), 'LogIn', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
                          } else{
                            response.isSuccess = true;
                            response.user_id = resp.body[0].userDetail[0].userId;
                            response.userRole = "DEALER";
                            response.userName = resp.body[0].dealerName;
                            response.dealerLiscenseNo = resp.body[0].licenceNo;
                            response.dealerDistrict = resp.body[0].districtCode;
                            response.dealerDistrictName = resp.body[0].districtName;
                            response.dealerBlockCode = resp.body[0].salePoint[0].blockCode;
                            response.dealerTempNo = resp.body[0].tempNo;
                            response.message = 'Successfully loggedIn.';
                            const accessToken = await signAccessToken(response);
                            response.token = accessToken;
                            // console.log("response",response);
                            logController.addAuditLog( req.body.userId, req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(), 'LogIn', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
                        }
                        res.send(response)
                        
                    } catch (e) {
                          console.log('sorry!' , e);
                          res.redirect('/login?status=Wrong Credetinal');
                          logController.addAuditLog( req.body.userId, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(), 'LogIn', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
                    }
                })
            }
                        
        } else {
            if (req.body.password == result.password) {
                switch (result.role) {

                    case 'SCHEME':
                        {
                            const user = await schemeController.getUserDetailsByUserId(result.user_id)
                            response.isSuccess = true;
                            response.user_id = user.user_id;
                            response.userRole = user.role;
                            response.userName = user.userName;
                            response.message = 'Successfully loggedIn.';
                            const accessToken = await signAccessToken(response);
                            response.token = accessToken;
                            break;
                        }
                    case 'DAFE':
                        {
                            const user = await schemeController.getUserDetailsByUserId(result.user_id)
                            response.isSuccess = true;
                            response.user_id = user.user_id;
                            response.userRole = user.role;
                            response.userName = user.userName;
                            response.State = 'Odisha';
                            response.message = 'Successfully loggedIn.';
                            const accessToken = await signAccessToken(response);
                            response.accessToken = accessToken;
                            response.token = accessToken;
                                // res.cookie('accessToken', accessToken).redirect('/user-login');
                           
                            break;
                        }
                    case 'ADO':
                        {
                            const user = await adoController.getUserDetailsByUserId(result.user_id)
                            response.isSuccess = true;
                            response.user_id = user.user_id;
                            response.userRole = user.role;
                            response.userName = user.userName;
                            response.message = 'Successfully loggedIn.';
                            const accessToken = await signAccessToken(response);
                            response.token = accessToken;
                            // res.cookie('accessToken', accessToken).redirect('/user-login');
                            break;
                        }
                   
                    case 'OSSC':
                            {
                                const user = await adoController.getUserDetailsByUserId(result.user_id)
                                response.isSuccess = true;
                                response.user_id = user.user_id;
                                response.userRole = user.role;
                                response.userName = user.userName;
                                response.message = 'Successfully loggedIn.';
                                const accessToken = await signAccessToken(response);
                                response.token = accessToken;
                                // res.cookie('accessToken', accessToken).redirect('/user-login');
                                break;
                            }   
                    case 'ADMIN':
                            {
                                const user = await adminController.getUserDetailsByUserId(result.user_id)
                                response.isSuccess = true;
                                response.user_id = user.user_id;
                                response.userRole = user.role;
                                response.userName = user.userName;
                                response.message = 'Successfully loggedIn.';
                                const accessToken = await signAccessToken(response);
                                response.token = accessToken;
                                break;
                            }
                }
                res.send(response)
                logController.addAuditLog( req.body.userId , req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'LogIn', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
    
                // logController.addAuditLog(req.body.username, "login", "success", 'Successfully login.', req.url, req.route.path, requestIP.getClientIp(req), parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version);
            } else {
                response.isSuccess = false;
                response.message = 'Wrong Credential';
                res.send(response)
                // res.redirect('/login?status=Wrong Credetinal');
                logController.addAuditLog( req.body.userId, req.protocol + '://' + req.get('host') + req.originalUrl , "Failure", req.originalUrl.split("?").shift(), 'LogIn', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())
                
            }
            // res.send(response)
            // logController.addAuditLog( req.body.userId , req.protocol + '://' + req.get('host') + req.originalUrl , "Success", req.originalUrl.split("?").shift(),'LogIn', req.method , requestIP.getClientIp(req) , parser.setUA(req.headers['user-agent']).getOS().name , parser.setUA(req.headers['user-agent']).getOS().version , parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version , req.device.type.toUpperCase())

        }
        
    } catch(e) {
        console.error(e);
    }

})

router.get('/checkUserPemission/:Role', verifyAccessToken, authController.checkUserPemission);

router.get('/signOut', verifyAccessToken , (req,res) => res.send(true))

router.post('/changePassword',verifyAccessToken, authController.changePassword);

router.get('/getAllDistrictReport', authController.getAllDistrictReport);

router.get('/getAllBlockReport', authController.getAllBlockReport);


module.exports = router;