const express = require('express')
const router = express.Router();
const userValidator = require('../validator/userValidator.js')
const vehicleValidator = require('../validator/vehicleValidator.js')
const userController = require('../controllers/userController');
const vehicleController = require('../controllers/vehicleController')

router.get('/ping', (request, response) => {
    return response.status(200).json({message:'fragou!'});
});

router.get('/user', userController.getUsers);
router.post('/user', userValidator.postUserAction, userController.postUser);
router.put('/user/:id', userValidator.editUserAction, userController.editUser);

router.get('/vehicle', vehicleController.getVehicles);
router.post('/vehicle', vehicleValidator.postVehicleAction, vehicleController.postVehicle);
router.put('/vehicle/:id', vehicleValidator.editVehicleAction, vehicleController.editVehicle);
router.delete('/vehicle/:id', vehicleController.deteleVehicle);

module.exports = router;