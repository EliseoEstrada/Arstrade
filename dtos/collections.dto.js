const joi = require('joi');

//Schema para datos requeridos y logica de negocio
const id = joi.string();
const title = joi.string().min(5);
const username = joi.string().min(5);
const image = joi.string();
const description = joi.string().max(1000);
const date = joi.string();
const posts = joi.array();

const createCollectionDto = joi.object({
  title: title.required(),
  username: username.required(),
  image: image.required(),
  description: description,
  date: date,
  posts: posts
});


const collectionIdDto = joi.object({
  id: id.required()
});

const getCollectionsByUserDto = joi.object({
  username: username.required()
});

module.exports = { createCollectionDto, collectionIdDto, getCollectionsByUserDto};
