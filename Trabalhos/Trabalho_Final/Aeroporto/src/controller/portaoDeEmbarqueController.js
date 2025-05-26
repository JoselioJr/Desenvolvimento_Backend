const { validationResult, matchedData } = require('express-validator');
const { request, response } = require('express');
const portaoDeEmbarqueService = require('../service/portaoDeEmbarqueService');

module.exports = {
    getAllPortaoDeEmbarque: async(request, response) => {
        const portaoDeEmbarque = await portaoDeEmbarqueService.getAllPortaoDeEmbarque();

        return response.status(200).json({portaoDeEmbarque});
    },
    postPortaoDeEmbarque: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);

        try {
            const newPortaoDeEmbarque = await portaoDeEmbarqueService.createPortaoDeEmbarque(data);
            return response.status(201).json({ portaoDeEmbarque: newPortaoDeEmbarque });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    },
    putPortaoDeEmbarque: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);
        const id = request.params.id;

        try {
            const updated = await portaoDeEmbarqueService.putPortaoDeEmbarque(id, data);
            if (updated) {
                return response.status(200).json({ success: true });
            } else {
                return response.status(404).json({ error: 'Portão de embarque não encontrado' });
            }
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    },
    deletePortaoDeEmbarque: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }
        
        const id = request.params.id;

        try {
            const deleted = await portaoDeEmbarqueService.deletePortaoDeEmbarque(id);
            if (deleted) {
                return response.status(204).send();
            } else {
                return response.status(404).json({ error: 'Portão de embarque não encontrado' });
            }
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}