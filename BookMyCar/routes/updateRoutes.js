const {Router} = require('express');
const router = Router();
const upload = require('../utils/multer');
const {authenticateAdminToken, authenticateOwnersToken,authenticateCustomerToken} = require('../middlewares/authenticate');
const {
    updatingVehicle,
    isAcceptedVehicle,
    uploadProfilePicture,
    uploadVehiclePhotos,
    editPassword,
    editProfile,
    blocking
} = require('../controllers/updateControllers');


//-------------------------------Admin Routes-------------------------------------------
router.patch(`/api/admin/:id/isBlocked`, authenticateAdminToken, blocking) //model=Owner or Cusotmer or Vehicle


//-------------------------------Owner Routes-------------------------------------------
router.patch(`'/api/owner/updatingjob/:jobid`, authenticateOwnersToken, updatingVehicle)
router.patch(`/api/owner/uploadprofilepicture`, authenticateOwnersToken, upload.single("uploadImage"), uploadProfilePicture);
router.patch(`/api/owner/editprofile`, authenticateOwnersToken, editProfile)
router.patch(`/api/owner/editpassword`, authenticateOwnersToken, editPassword)
router.patch(`/api/owner/vehiclephotos`, authenticateOwnersToken, upload.array("images"), uploadVehiclePhotos);



//-------------------------------Customer Routes-------------------------------------------
router.patch(`/api/customer/searchvehicles/byvehicleid/:vehicleid/isaccepted/`, authenticateCustomerToken, isAcceptedVehicle)
router.patch(`/api/customer/uploadprofilepicture`, authenticateCustomerToken, upload.single("image"), uploadProfilePicture);
router.patch(`/api/customer/editprofile`, authenticateCustomerToken, editProfile)
router.patch(`/api/customer/editpassword`, authenticateCustomerToken, editPassword)



module.exports = router;