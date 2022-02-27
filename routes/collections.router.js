const express = require('express');
const CollectionService = require('../services/collections.service');
const service = new CollectionService();

const validatorHandler = require('./../middlewares/validator.handler');
const { createCollectionDto, collectionIdDto, getCollectionsByUserDto } = require('../dtos/collections.dto');

const router = express.Router();

//Obtener colleciones
router.get('/', (req, res, next) => {

  try{

    const { size } = req.query
    const collections = service.find(size || 5)  //si no existe size colocar 10

    res.json({
      "success": true,
      "message": 'colecciones obtenidos',
      "data": collections
    });

  }
  catch(error)
  {
    next(error);
  }

});

//Crear nueva coleccion
router.post('/', validatorHandler(createCollectionDto, 'body'), (req, res) => {
  //body obtiene todos los datos ingresados por el usuario
  const body = req.body;
  const collection = service.create(body);

  res.json({
    "success": true,
    "message": "coleccion creada con exito",
    "data": collection
  });
});


//Actualizar coleccion
router.patch('/:id', (req, res, next) => {

  try{
    const {id} = req.params;
    const body = req.body;

    const {original, updated} = service.update(id, body);
    res.json({
      "success": true,
      "message": "coleccion actualizada con exito",
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

//obtener colecciones por id
router.get('/:id', validatorHandler(collectionIdDto, 'params'), (req, res, next) => {

  try{
    //params obtiene los parametros de la url
    const { id } = req.params;
    const collection = service.findById(id);
    res.json({
      "success": true,
      "message": 'collecion obtenida con exito',
      "data": collection
    });
  }
  catch(error)
  {
    next(error);
  }
});

//obtener colecciones por usuario
router.get('/user/:username', validatorHandler(getCollectionsByUserDto, 'params'), (req, res, next) => {

  try{
    //params obtiene los parametros de la url
    const { username } = req.params;
    const collections = service.findByUsername(username);
    res.json({
      "success": true,
      "message": 'colleciones obtenidas con exito',
      "data": collections
    });
  }
  catch(error)
  {
    next(error);
  }
});



//Borrar colleccion
router.delete('/:id',  validatorHandler(collectionIdDto, 'params'), (req, res, next) => {

  try{
    const {id} = req.params;
    const collection = service.delete(id);
    res.json({
      "success": true,
      "message": "coleccion eliminada con exito",
      "data": collection
    });
  }
  catch(error)
  {
    next(error);
  }

});

module.exports = router;
