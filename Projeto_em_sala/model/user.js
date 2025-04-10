const mongoose = require('mongoose'); //Importação ou refenrência do Mongoose
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name:String,
    email:String,
    nascimento:String,
    estado:String,
    token:String
})

const modelName = 'users'

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}