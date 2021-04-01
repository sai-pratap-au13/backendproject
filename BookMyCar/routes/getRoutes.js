const {Router} = require('express');
const router = Router();

const {
    allAvailableVehicles,
    vehicleById,
    filterVehicles,
    vehileOnRentByParticularOwner,
    vehileOnRentAcceptedByParticularCustomer,
    accountActivation,
    allAvailableVehicleIncludingBlocked,
    allAcceptedVehicle,
    allOwners,
    allCustomers
} = require('../controllers/getControllers')

const {authenticateOwnersToken, authenticateCustomerToken, authenticateAdminToken} = require('../middlewares/authenticate');

//_________________________________________Admin routes_____________________________________________________________
router.get(`/api/admin/allavailablevehicles/:pagenumber`, authenticateAdminToken, allAvailableVehicleIncludingBlocked)
router.get(`/api/admin/allacceptedvehicles/:pagenumber`, authenticateAdminToken, allAcceptedVehicle)
router.get(`/api/admin/allowners/:pagenumber`, authenticateAdminToken, allOwners)
router.get(`/api/admin/allcustomers/:pagenumber`, authenticateAdminToken, allCustomers)


//_________________________________________Account activation routes_____________________________________________________________
router.get(`/api/accountactivation/:activationtoken`, accountActivation) // ?user= Owner or Customer

//_________________________________________Customers routes_____________________________________________________________
router.get(`/api/customers/searchvehicles/allavailablevehicles/:pagenumber`, allAvailableVehicles)
router.get(`/api/customers/searchvehicles/filter/:pagenumber`, filterVehicles)   //?query=(search by name, city, zipcode, fuelType, vehicle,make, color)
router.get(`/api/customers/searchvehicles/byvehicleid/:vehicleid/`, authenticateCustomerToken, vehicleById)
router.get(`/api/customers/vehicleacceptedtilldate/:pagenumber/`, authenticateCustomerToken, vehileOnRentAcceptedByParticularCustomer)

//_________________________________________Owners routes_____________________________________________________________
router.get('api/owners/vehiclepostedtilltoday/:pagenumber', authenticateOwnersToken, vehileOnRentByParticularOwner)


module.exports = router;