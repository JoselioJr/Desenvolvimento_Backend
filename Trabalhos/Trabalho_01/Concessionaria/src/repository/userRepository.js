const User = require('../models/user');

module.exports = {
    findAllUsers: async() =>{
        return await User.find();
    },
    findByEmail: async(email) =>{
        return await User.findOne({email});
    },
    findById: async(id) =>{
        return await User.findOne({id});
    },
    createUser: async(userData) =>{
        const newUser = new User(userData);
        return await newUser.save();
    },
    editUserById: async(id, updates) =>{
        return await User.findByIdAndUpdate(id, {$set:updates}, {new:true});
    }
}