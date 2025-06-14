const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config({path:'.env'});
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/swagger/swagger.json')

const apiRouters = require('./src/routes/routers.js');

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) =>{
    console.error("ERROR"+ error.message);
});

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use("/", apiRouters);

const servico = server.listen(process.env.PORT, () =>{
    console.log("Servidor rodando na porta "+ servico.address().port);
});