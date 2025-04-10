const express = require ('express');
const router = express.Router();

const userControl = require ('./controller/userController');

router.get('/ping', (request, response) =>{
    response.json({retorno:true})
});

router.get('/states', userControl.getStates);

router.get('/users', userControl.getUsers);

module.exports = router;