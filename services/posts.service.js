const faker = require('faker');
const boom = require('@hapi/boom');
const PostModel = require('../models/post.model');

const notFoundCatalog = "No se encontro el catalogo solicitado";
const notFoundRegister = "No se encontro ningun registro";

class PostService {

  constructor(){
    this.posts = [];
    this.generate();
  }

  generate(){
    const limit = 50;
    for (let i = 0; i < limit; i++) {
      this.posts.push({
        id: faker.datatype.uuid(),
        title: faker.name.title(),
        username: faker.internet.userName(),
        image: faker.image.imageUrl(),
        category: faker.music.genre(),
        date: faker.datatype.datetime()
      });
    }
  }

  find(size){
    const posts = this.posts.filter((item, index) => item && index < size);

    if(!posts){
      throw boom.notFound('No se encontro el catalogo solicitado');
    }
    if(posts.length <= 0){
      throw boom.notFound('No hay posts creados');
    }
    return posts;
  }

  //Crear post
  create(data){
    const newPost = {
      id: faker.datatype.uuid(),
      ...data//Pasar toos los elementos en data
    }

    this.posts.push(newPost);
    return newPost;
  }

  findOne(id){
    const post = this.posts.find((item) => item.id === id);
    if(!post){
      throw boom.notFound('No existe el post');
    }
    return post;
  }

  findByCategory(category){
    const post = this.posts.find((item) => item.category === category);
    if(!post){
      throw boom.notFound('No hay posts con esta categoria');
    }
    return post;
  }

  findByUser(username){
    const posts = this.posts.find((item) => item.username === username);
    if(!posts){
      throw boom.notFound('No hay posts de este usuario');
    }
    return posts;
  }

  update(id, changes){
    const index = this.posts.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Post no encontrado')
      //throw new Error('Post no encontrado'); //forma tradicional
    }

    var currentPost = this.posts[index];
    this.posts[index] = {
      ...currentPost, //old data
      ...changes  //new data
    };

    return {
      original: currentPost,
      updated: this.posts[index]
    };
  }

  //Borrar post
  delete(id){
    const index = this.posts.findIndex(item => item.id === id);
    console.log("Index: " + index);
    if(index === -1){
      throw boom.notFound('El post no existe');
    }
    var currentPost = this.posts[index];
    this.posts.splice(index, 1);
    return currentPost;
  }

  //BD METHODS
  async findDB(limit, filter){
    let postsDB = await PostModel.find(filter);

    if(!postsDB){
      throw boom.notFound(notFoundCatalog);
    }
    if(postsDB.length <= 0){
      throw boom.notFound('No hay posts creados');
    }

    postsDB = limit ? postsDB.filter((item, index) => item && index < limit ) : postsDB;
    return postsDB;
  }

  async createDB(data){
    const model = new PostModel(data);
    await model.save();
    return data;
  }

  async findOneDB(id){

    var regexTextId = ""

    //const post = this.posts.find((item) => item.id === id);
    const post = await PostModel.findOne({
      _id:id
    });

    if(post == undefined || post == null){
      throw boom.notFound(notFoundCatalog);
    }
    if(post.length <= 0){
      throw boom.notFound(notFoundRegister);
    }

    return post;
  }

  async updateDB(id, changes){
    let post = await PostModel.findOne({
      _id:id
    });

    if(post == undefined || post == null){
      throw boom.notFound(notFoundCatalog);
    }
    if(post.length <= 0){
      throw boom.notFound(notFoundRegister);
    }

    let postOriginal = {
      title: post.title
    };

    const { title } = changes;
    post.title = title;
    post.save();

    return {
      original: postOriginal,
      updated: post
    }

  }

  async deleteDB(id){
    let post = await PostModel.findOne({
      _id:id
    });


    const { deletedCount } = await PostModel.deleteOne({
      _id: id
    });

    if(deletedCount <= 0){
      throw boom.notFound('No existe el registro');
    }

    return post;
  }
}

module.exports = PostService;
