const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const routerBase = require('./routes/medicamentos.routes');

app.use('/test', routerBase)
app.use(express.json());
app.listen(port, ()=>{
    console.log(`Puerto Conectado en ${port}`);
});



