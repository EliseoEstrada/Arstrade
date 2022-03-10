const express = require('express');
const routerApi = require('./routes');
const {logErrors, boomErrorHandler, errorHandler} = require('./middlewares/error.handler');

const db = require('./db');
const { dbconnection } = require('./consts.json');

const app = express();
const port = 3000;

db(dbconnection);

//Definir a la app que se utilizara JSON como formato de datos
app.use(express.json());

//Rutas de entidades
routerApi(app);

//MIDDLEWARES (manejo de errores BOOM, validaciones JOI)
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=> {
  console.log('Trabajando en puerto: '+ port);
})
