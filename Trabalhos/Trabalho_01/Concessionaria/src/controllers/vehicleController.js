const { validationResult, matchedData } = require('express-validator');
const { request, response } = require('express');
const vehicleService = require('../service/vehicleService');

module.exports = {
    getVehicles: async(request, response) =>{
        const vehicles = await vehicleService.getAllVehicles();

        return response.status(200).json({ vehicles });
    },
    postVehicle: async(request, response) =>{
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);

        try {
            const newVehicle = await vehicleService.createVehicle(data);
            return response.status(200).json({ vehicle: newVehicle });
        } catch (error) {
            return response.status(400).json({ error: error.menssage });
        }
    },
    editVehicle: async(request, response) =>{
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);
        const id = request.params.id;

        try {
            await vehicleService.editVehicle(id, data);
            return response.status(200).json({ sucess: true });
        } catch (error) {
            return response.status(400).json({ error: error.menssage });
        }
    },
    deteleVehicle: async(request, response) =>{
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const id = request.params.id;

        try {
            await vehicleService.deleteVehicle(id);
            return response.status(200).json({ sucess: true });
        } catch (error) {
            return response.status(400).json({ error: error.menssage });
        }
    }
}