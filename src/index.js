const express = require('express');
const morgan = require("morgan");
const path = require("path");

const app = express();

//Configuração da porta de acesso
app.set("port", process.env.PORT || 3000)

//Middlewares para visualização de chamadas pelo terminal e envio e recebimento de msgs via json
app.use(morgan("dev"));
app.use(express.json());

//Criação de rota para a API de produtos
app.use("/api",require('./server-routes/product'));


//Arquivos estátivos
app.use(express.static(path.join(__dirname,"cli-public")))

//Inicializando o servidor
app.listen(app.get('port'),() => {
    console.log(`server on port ${app.get('port')}`);
});