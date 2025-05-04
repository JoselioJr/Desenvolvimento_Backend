const userRepository = require('../repository/userRepository');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

module.exports = {
    getAllUsers: async() =>{
        return await userRepository.findAllUsers();
    },
    createUser: async(data) =>{
        const emailCheck = await userRepository.findByEmail(data.email);

        if (emailCheck) {
            throw new Error('E-mail já cadastrado!');
        }

        const passwordHash = await bcrypt.hash(data.password, 11);

        const userData = {
            name: data.name,
            password: passwordHash,
            email: data.email,
            vehicle: data.vehicle
        }

        return await userRepository.createUser(userData);
    },
    editUser: async(id, data) => {
        const updates = {};

        if(data.name){
            updates.name = data.name;
        }
        
        if(data.password){
            updates.password = await bcrypt.hash(data.password, 11);
        }

        if(data.email){
            const emailCheck = await userRepository.findByEmail(data.email);

            if(emailCheck){
                throw new Error('E-mail já cadastrado!');
            }

            updates.email = data.email;
        }

        const userAtualizado = userRepository.editUserById(id, updates);

        return userAtualizado;
    }
}