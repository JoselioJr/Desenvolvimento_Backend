const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = mongoose.Schema({
    mark:String,
    model:String,
    year:Number,
    color:String,
    fuel_type:String,
    idUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: true
    },
    plate:String,
    number_doors:Number
})

const modelName = 'Vehicles'

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}