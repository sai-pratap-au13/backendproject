const {Router} = require('express');
const router = Router();
const {logoutUser,deletingVehicle} = require('../controllers/deleteControllers');
const {authenticateAdminToken,authenticateCustomerToken,authenticateOwnersToken} = require('../middlewares/authenticate');

//_________________________Owner Route__________________________________________________
router.delete(`/api/owner/deletingvehicle/:vehicleid`, authenticateOwnersToken, deletingVehicle);
router.delete(`/api/owner/logout`, authenticateOwnersToken, logoutUser)


//_________________________Customer Route__________________________________________________
router.delete(`/api/customer/logout`, authenticateCustomerToken, logoutUser);


//_________________________Admin Route__________________________________________________
router.delete(`/api/admin/logout`,authenticateAdminToken, logoutUser)


module.exports = router;