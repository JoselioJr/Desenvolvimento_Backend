const { validationResult, matchedData } = require('express-validator');
const { request, response } = require('express');
const funcionarioService = require('../service/funcionarioService');

module.exports = {
    postFuncionario: async (request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()) {
            response.status(400).json({ error: erros.mapped() })
        }

        const data = matchedData(request);

        try {
            const newFuncionario = await funcionarioService.createFuncionario(data);
            return response.status(201).json({ funcionario: newFuncionario });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    },
    loginFuncionario: async (request, response) => {
        const erros = validationResult(request);

        if (!erros.isEmpty()) {
            response.status(400).json({ error: erros.mapped() })
        }

        const data = matchedData(request);

        try {
            const funcionario = await funcionarioService.loginFuncionario(data);
            if (funcionario) {
                return response.status(200).json({ funcionario });
            } else {
                return response.status(401).json({ error: 'Credenciais inválidas' });
            }
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}