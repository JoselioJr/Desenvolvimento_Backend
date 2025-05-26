const { validationResult, matchedData } = require('express-validator');
const { request, response } = require('express');
const vooService = require('../service/vooService');

module.exports = {
    getAllVoos: async(request, response) => {
        const voos = await vooService.getAllVoos();

        return response.status(200).json({voos});
    },
    getVoosByDia: async(request, response) =>{
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = request.params.data;

        try {
            const voosByDia = await vooService.getAllVoosByDia(data);
            return response.status(200).json({ voosByDia: voosByDia });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    },
    postVoo: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);

        try {
            const newVoo = await vooService.createVoo(data);
            return response.status(201).json({ voo: newVoo });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    },
    putVoo: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);
        const id = request.params.id;

        try {
            const updated = await vooService.putVoo(id, data);
            if (updated) {
                return response.status(200).json({ success: true });
            } else {
                return response.status(404).json({ error: 'Voo não encontrado' });
            }
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    },
    deleteVoo: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }
        
        const id = request.params.id;

        try {
            const deleted = await vooService.deleteVoo(id);
            if (deleted) {
                return response.status(204).send();
            } else {
                return response.status(404).json({ error: 'Voo não encontrado' });
            }
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
};