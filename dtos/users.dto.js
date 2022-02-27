const joi = require('joi');

//Schema para datos requeridos y logica de negocio
const id = joi.string();
const username = joi.string().min(3);
const name = joi.string();
const password = joi.string();
const email = joi.string();
const avatar = joi.string();
const description = joi.string().max(1000);
const category = joi.string();
const comission = joi.number();
const date = joi.string();

const createUserDto = joi.object({
  username: username.required(),
  email: email.required(),
  name: name,
  password: password,
  avatar: avatar,
  description: description,
  category: category,
  comission: comission,
  date: date
});

const updateUserDto = joi.object({
  username: username.required(),
  email: email.required(),
  name: name,
  password: password,
  avatar: avatar,
  description: description,
  category: category,
  comission: comission
});

const userById = joi.object({
  id: id.required()
});

module.exports = { createUserDto, updateUserDto, userById};
