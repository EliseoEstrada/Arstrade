const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Modelo de la base de datos
const postSchema = new Schema({
  id: String,
  title: String,
  category: String
});

const model = mongoose.model('posts', postSchema);
module.exports = model;
