const express = require('express');
const PostService = require('../services/posts.service');
const service = new PostService();

const validatorHandler = require('./../middlewares/validator.handler');
const { createPostDto, updatePostDto, postByIdDto } = require('../dtos/posts.dto');

const router = express.Router();

//RUTAS GENERALES /

//Obtener posts
router.get('/', (req, res, next) => {

  try{

    const { size } = req.query
    const posts = service.find(size || 10)  //si no existe size colocar 10

    res.json({
      "success": true,
      "message": 'Post obtenidos',
      "data": posts
    });

  }
  catch(error)
  {
    next(error);
  }

});


//Crear nuevo post
router.post('/', validatorHandler(createPostDto, 'body'), (req, res) => {
  //body obtiene todos los datos ingresados por el usuario
  const body = req.body;
  const posts = service.create(body);

  res.json({
    "success": true,
    "message": "post creado con exito",
    "data": posts
  });
});


//RUTAS ESPECIFICAS /:id


//Obtener post por ID
router.get('/:id', validatorHandler(postByIdDto, 'params'), (req, res, next) => {

  try{
    //params obtiene los parametros de la url
    const { id } = req.params;
    const post = service.findOne(id);
    res.json({
      "success": true,
      "message": 'Post obtenido con exito',
      "data": post
    });
  }
  catch(error)
  {
    next(error);
  }
});


//Obtener post por usuario
router.get('/user/:username', (req, res, next) => {

  try{
    //params obtiene los parametros de la url
    const { username } = req.params;
    const posts = service.findByUser(username);
    res.json({
      "success": true,
      "message": 'Post obtenidos con exito',
      "data": posts
    });
  }
  catch(error)
  {
    next(error);
  }
});


//Obtener post por categoria
router.get('/category/:category', (req, res, next) => {

  try{
    //params obtiene los parametros de la url
    const { category } = req.params;
    const post = service.findByCategory(category);
    res.json({
      "success": true,
      "message": 'Posts obtenidos con exito',
      "data": post
    });
  }
  catch(error)
  {
    next(error);
  }

});


//Actualizar post
router.patch('/:id', validatorHandler(updatePostDto, 'body'), (req, res, next) => {

  try{
    const {id} = req.params;
    const body = req.body;

    const {original, updated} = service.update(id, body);
    res.json({
      "success": true,
      "message": "post actualizado con exito",
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


//Borrar post
router.delete('/:id',validatorHandler(postByIdDto, 'params'), (req, res, next) => {

  try{
    const {id} = req.params;
    const post = service.delete(id);
    res.json({
      "success": true,
      "message": "post eliminado con exito",
      "data": post
    });
  }
  catch(error)
  {
    next(error);
  }

});


//RUTAS COMPLEJAS   /:id/photos

//RUTAS COMPLEJAS ESPECIFICAS  /:id/photos/id

module.exports = router;
