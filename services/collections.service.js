const faker = require('faker');
const boom = require('@hapi/boom');

class CollectionService {

  constructor(){
    this.collections = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.collections.push({
        id: faker.datatype.uuid(),
        title: faker.name.title(),
        username: faker.internet.userName(),
        image: faker.image.imageUrl(),
        description: faker.lorem.text(),
        date: faker.datatype.datetime(),
        posts: [faker.datatype.uuid(),faker.datatype.uuid(),faker.datatype.uuid()]
      });
    }
  }


  //Crear coleccion
  create(data){
    const newCollection = {
      id: faker.datatype.uuid(),
      ...data//Pasar toos los elementos en data
    }

    this.collections.push(newCollection);
    return newCollection;
  }

  find(size){
    const collections = this.collections.filter((item, index) => item && index < size);
    if(!collections || collections.length <= 0){
      throw boom.notFound('No hay colecciones creados');
    }
    return collections;
  }

  findById(id){
    const collections = this.collections.find((item) => item.id === id);
    if(!collections || collections.length <= 0){
      throw boom.notFound('No existe la coleccion');
    }
    return collections;
  }

  findByUsername(username){
    const collections = this.collections.find((item) => item.username === username);
    if(!collections || collections.length <= 0){
      throw boom.notFound('No hay colecciones de este usuario');
    }
    return collections;
  }

  update(id, changes){
    const index = this.collections.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('coleccion no encontrada')
      //throw new Error('Post no encontrado'); //forma tradicional
    }

    var currentCollection = this.collections[index];
    this.collections[index] = {
      ...currentCollection, //old data
      ...changes  //new data
    };

    return {
      original: currentCollection,
      updated: this.collections[index]
    };
  }

  //Borrar coleccion
  delete(id){
    const index = this.collections.findIndex(item => item.id === id);
    console.log("Index: " + index);
    if(index === -1){
      throw boom.notFound('La coleccion no existe');
    }
    var currentCollection = this.collections[index];
    this.collections.splice(index, 1);
    return currentCollection;
  }

}

module.exports = CollectionService;
