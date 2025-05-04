const { checkSchema } = require('express-validator');

module.exports = {
    postUserAction: checkSchema({
        name: {
            notEmpty: true,
            trim: true,
            isLength: {
                options:{min:1},
                errorMessage: 'Nome precisa de pelo menos 1 caracter!'
            },
            errorMessage: 'Nome é obrigatório'
        },
        password: {
            notEmpty: true,
            isLength: {
                options:{min:6},
                errorMessage: 'Senha deve ter no mínimo 6 caracteres!'
            },
            errorMessage: 'Senha é obrigatório'
        },
        email: {
            notEmpty: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido!'
        }
    }),
    editUserAction: checkSchema({
        name: {
            notEmpty: true,
            trim: true,
            isLength: {
                options:{min:1},
                errorMessage: 'Nome precisa de pelo menos 1 caracter!'
            }
        },
        password: {
            notEmpty: true,
            isLength: {
                options:{min:6},
                errorMessage: 'Senha deve ter no mínimo 6 caracteres!'
            }
        },
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido!'
        }
    })
}