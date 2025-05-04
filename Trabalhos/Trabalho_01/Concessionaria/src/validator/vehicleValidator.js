const { checkSchema } = require('express-validator');

module.exports = {
    postVehicleAction: checkSchema({
        mark: {
            notEmpty: true,
            trim: true,
            isLength:{
                options: {min:2},
                errorMessage: 'Marca precisa de pelo menos 2 caracteres'
            },
            errorMessage: 'Marca é obrigatírio'
        },
        model: {
            notEmpty: true,
            trim: true,
            isLength:{
                options: {min:2},
                errorMessage: 'Modelo precisa de pelo menos 2 caracteres'
            },
            errorMessage: 'Modelo é obrigatório'
        },
        year: {
            notEmpty: true,
            errorMessage: 'Ano é obrigatório'
        },
        color: {
            notEmpty: true,
            errorMessage: 'Cor é obrigatório'
        },
        fuel_type: {
            notEmpty: true,
            errorMessage: 'Tipo de Combustível é obrigatório'
        },
        idUser: {
            notEmpty: true,
            isMongoId: {
                errorMessage: 'ID do usuário inválido'
            },
            errorMessage: 'ID do usuário é obrigatório'
        },
        plate: {
            notEmpty: true,
            trim: true,
            isLength:{
                options: {min:7},
                errorMessage: 'Placa é preciso ter 7 caraceters'
            },
            errorMessage: 'Placa é obrigatório'
        },
        number_doors: {
            notEmpty: true,
            errorMessage: 'Quantidade de portas é obrigatório'
        }
    }),
    editVehicleAction: checkSchema({
        mark: {
            optional: true,
            trim: true,
            isLength:{
                options: {min:2},
                errorMessage: 'Marca precisa de pelo menos 2 caracteres'
            },
        },
        model: {
            optional: true,
            trim: true,
            isLength:{
                options: {min:2},
                errorMessage: 'Modelo precisa de pelo menos 2 caracteres'
            },
        },
        year: {
            optional: true,
        },
        color: {
            optional: true,
        },
        fuel_type: {
            optional: true,
        },
        idUser: {
            notEmpty: true,
            isMongoId: {
                errorMessage: 'ID do usuário inválido'
            },
            errorMessage: 'ID do usuário é obrigatório'
        },
        plate: {
            optional: true,
            trim: true,
            isLength:{
                options: {min:7},
                errorMessage: 'Placa é preciso ter 7 caraceters'
            },
        },
        number_doors: {
            optional: true,
        }
    })
}