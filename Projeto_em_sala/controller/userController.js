const mongoose = require ('mongoose');
const State = require ('../model/state')
const User = require ('../model/user')

module.exports = {
    getStates: async(request, response) =>{
        let states = await State.find();
        response.json({states});
    },
    getUsers: async(request, response) =>{
        let users = await User.find();
        response.json({users});
    }
}
