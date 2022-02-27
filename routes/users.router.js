const express = require('express');
const UserService = require('../services/users.service');
const service = new UserService();

const validatorHandler = require('../middlewares/validator.handler');
const { createUserDto, updateUserDto, userById } = require('../dtos/users.dto');

const router = express.Router();

//Obtener usuarios
router.get('/', (req, res, next) => {

  try{

    const { size } = req.query
    const users = service.find(size || 10)  //si no existe size colocar 10

    res.json({
      "success": true,
      "message": 'Usuarios encontrados',
      "data": users
    });

  }
  catch(error)
  {
    next(error);
  }

});


//Obtener usuario por ID
router.get('/:id', validatorHandler(userById, 'params'), (req, res, next) => {

  try{
    //params obtiene los parametros de la url
    const { id } = req.params;
    const user = service.findOne(id);
    res.json({
      "success": true,
      "message": 'usuario encontrado con exito',
      "data": user
    });
  }
  catch(error)
  {
    next(error);
  }
});

//Crear nuevo usuario
router.post('/', validatorHandler(createUserDto, 'body'), (req, res) => {
  //body obtiene todos los datos ingresados por el usuario
  const body = req.body;
  const user = service.create(body);

  res.json({
    "success": true,
    "message": "usuario creado con exito",
    "data": user
  });
});

//Obtener artista por categoria
router.get('/category/:category', (req, res, next) => {

  try{
    //params obtiene los parametros de la url
    const { category } = req.params;
    const users = service.findByCategory(category);
    res.json({
      "success": true,
      "message": 'usuarios obtenidos con exito',
      "data": users
    });
  }
  catch(error)
  {
    next(error);
  }

});


//Actualizar usuario
router.patch('/:id', validatorHandler(updateUserDto, 'body'), (req, res, next) => {

  try{
    const {id} = req.params;
    const body = req.body;

    const {original, updated} = service.update(id, body);
    res.json({
      "success": true,
      "message": "usuario actualizado con exito",
      "data": {
        "original": original,
        "updated": updated
      }
    });
  }
  catch(error){
    next(error);
  }

});

//Borrar usuario
router.delete('/:id', validatorHandler(userById, 'params'), (req, res, next) => {

  try{
    const {id} = req.params;
    const user = service.delete(id);
    res.json({
      "success": true,
      "message": "usuario eliminado con exito",
      "data": user
    });
  }
  catch(error)
  {
    next(error);
  }

});

module.exports = router;
