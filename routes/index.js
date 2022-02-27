const express = require('express');

const postsRouter = require('./posts.router');
const usersRouter = require('./users.router');
const collectionsRouter = require('./collections.router');

const routerApi = (app) => {

  const router = express.Router();

  //Emparentar router a app y ruta base
  app.use('/api/v1', router);
  //app.use('/', router);

  //Endpoints v1
  router.use('/posts', postsRouter);
  router.use('/users', usersRouter);
  router.use('/collections', collectionsRouter);

  //v2
}



module.exports = routerApi;
