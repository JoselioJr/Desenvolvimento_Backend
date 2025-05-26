const { validationResult, matchedData } = require('express-validator');
const { request, response } = require('express');
const passageiroService = require('../service/passageiroService');

module.exports = {
    getAllPassageiros: async(request, response) => {
        const passageiros = await passageiroService.getAllPassageiros();

        return response.status(200).json({passageiros});
    },
    getAllPassageirosByVoo: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = request.params.voo;

        try {
            const passageirosbByVoo = await passageiroService.getAllPassageirosByVoo(data);
            return response.status(200).json({ passageirosbByVoo: passageirosbByVoo });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    },
    getAllPassageirosByNomeAndStatusCheckIn: async(request, response) => {
        try {
            const resumo = await passageiroService.getAllPassageirosByNomeAndStatusCheckIn();
            return response.status(200).json({ resumo: resumo });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    },
    postPassageiro: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);

        try {
            const newPassageiro = await passageiroService.createPassageiro(data);
            return response.status(201).json({ passageiro: newPassageiro });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    },
    putPassageiro: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);
        const id = request.params.id;

        try {
            const updated = await passageiroService.putPassageiro(id, data);
            if (updated) {
                return response.status(200).json({ success: true });
            } else {
                return response.status(404).json({ error: "Passageiro não encontrado" });
            }
        } catch (error) {
            return response.status(500).json({ error: error.message });r
        }
    },
    deletePassageiro: async(request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const id = request.params.id;

        try {
            const deleted = await passageiroService.deletePassageiro(id);
            if (deleted) {
                return response.status(204).send();
            } else {
                return response.status(404).json({ error: "Passageiro não encontrado" });
            }
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}