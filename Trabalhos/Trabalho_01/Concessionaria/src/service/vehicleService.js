const mongoose = require('mongoose');
const vehicleRepository = require('../repository/vehicleRepository')
const userRepository = require('../repository/userRepository')

module.exports = {
    getAllVehicles: async() =>{
        const vehicles = await vehicleRepository.getAllVehicles();

        return vehicles;
    },
    createVehicle: async(data) =>{
        const plateCheck = await vehicleRepository.findVehicleByPlate(data.plate);

        if (plateCheck){
            throw new Error('Veículo já cadastrado!')
        }

        const vehicleData = {
            mark: data.mark,
            model: data.model,
            year: data.year,
            color: data.color,
            fuel_type: data.fuel_type,
            idUser: data.idUser,
            plate: data.plate,
            number_doors: data.number_doors
        }

        return await vehicleRepository.createVehicle(vehicleData);
    },
    editVehicle: async(id, data) =>{
        const updates = {};

        if (data.mark){
            updates.mark = data.mark;
        }
        if (data.model){
            updates.model = data.model;
        }
        if (data.year){
            updates.year = data.year;
        }
        if (data.color){
            updates.color = data.color;
        }
        if (data.fuel_type){
            updates.duel_type = data.fuel_type;
        }
        if (data.idUser){
            if (!mongoose.Types.ObjectId.isValid(data.idUser)){
                throw new Error('Usuário não encontrado!')
            }

            const user = await userRepository.findById(data.idUser);

            updates.idUser = data.idUser;
        }
        if (data.plate){
            updates.plate = data.plate;
        }
        if (data.number_doors){
            updates.number_doors = data.number_doors;
        }

        return await vehicleRepository.editVehicleById(id, updates);
    },
    deleteVehicle: async(id) =>{
        return await vehicleRepository.deleteVehicle(id);
    }
}