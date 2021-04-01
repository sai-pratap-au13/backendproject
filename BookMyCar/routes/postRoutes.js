const {Router} = require('express');
const router = Router();

const {userRegister, userLogin, forgotPassword, vehicleOnRent, resetPassword} = require('../controllers/postControllers');


const {authenticateOwnersToken, authenticateCustomerToken} = require("../middlewares/authenticate")


//_____________________Account Registration_____________________
router.post(`/api/user/register`, userRegister);

//_____________________Account Login_____________________
router.post(`/api/user/login`,userLogin);

//_____________________Account forgot Password_____________________
router.post(`/api/user/resetPassword`,resetPassword);

//_____________________Account posting vehicle on rent_____________________
router.post(`/api/user/vehicleonrent`,authenticateOwnersToken, vehicleOnRent);


module.exports = router;