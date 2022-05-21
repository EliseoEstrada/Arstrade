//const { string, date } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Modelo de la base de datos
const postSchema = new Schema({
  id: String,
  title: String,
  username: String,
  image: String,
  category: String,
  date: Date
});

const model = mongoose.model('posts', postSchema);
module.exports = model;

//https://mongoosejs.com/docs/queries.html
