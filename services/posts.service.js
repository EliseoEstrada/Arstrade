const faker = require('faker');
const boom = require('@hapi/boom');


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
    if(!posts || posts.length <= 0){
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
}

module.exports = PostService;
