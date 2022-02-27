const joi = require('joi');

//Schema para datos requeridos y logica de negocio
const id = joi.string();
const title = joi.string().min(5);
const username = joi.string();
const image = joi.string();
const category = joi.string();
const date = joi.string();

const name = joi.string().alphanum().min(3).max(15);
const price = joi.number().integer().min(10);


const createPostDto = joi.object({
  title: title.required(),
  username: username.required(),
  image: image,
  category: category,
  date: date
});

const updatePostDto = joi.object({
  title: title.required(),
  username: username.required(),
  image: image,
  category: category,
});

const postByIdDto = joi.object({
  id: id.required()
});

module.exports = { createPostDto, updatePostDto, postByIdDto};
