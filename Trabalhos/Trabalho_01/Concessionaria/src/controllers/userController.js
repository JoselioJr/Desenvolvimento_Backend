const { validationResult, matchedData } = require('express-validator');
const { request, response } = require('express');
const userService = require('../service/userService');

module.exports = {
    getUsers: async(request, response) =>{
        const users = await userService.getAllUsers();

        return response.status(200).json({ users });
    },
    postUser: async(request, response) =>{
        const erros = validationResult(request);

        if(!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);

        try {
            const newUser = await userService.createUser(data);
            return response.status(200).json({ user: newUser });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    },
    editUser: async(request, response) =>{
        const erros = validationResult(request);

        if(!erros.isEmpty()){
            response.status(400).json({ error:erros.mapped() })
        }

        const data = matchedData(request);
        const userId = request.params.id;
        
        try {
            await userService.editUser(userId, data);
            return response.status(200).json({ sucess: true });
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }
    }
}
