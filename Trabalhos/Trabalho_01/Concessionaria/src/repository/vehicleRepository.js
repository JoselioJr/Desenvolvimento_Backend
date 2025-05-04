const Vehicle = require('../models/vehicle');

module.exports = {
    getAllVehicles: async() =>{
        return await Vehicle.find();
    },
    findVehicleByPlate: async(plate) =>{
        return await Vehicle.findOne({plate});
    },
    createVehicle: async(vehicleData) =>{
        const newVehicle = new Vehicle(vehicleData);
        return newVehicle.save();
    },
    editVehicleById: async(id, updates) =>{
        return await Vehicle.findByIdAndUpdate(id, {$set:updates}, {new:true})
    },
    deleteVehicle: async(id) =>{
        return await Vehicle.findByIdAndDelete(id);
    }
}