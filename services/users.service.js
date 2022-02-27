const faker = require('faker');
const boom = require('@hapi/boom');


class UserService {

  constructor(){
    this.users = [];
    this.generate();
  }

  generate(){
    const limit = 50;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        password: faker.internet.password(),
        avatar: faker.image.avatar(),
        description: faker.lorem.text(),
        category: faker.music.genre(),
        commission: faker.commerce.price(),
        date: faker.datatype.datetime()
      });
    }
  }

  find(size){
    const users = this.users.filter((item, index) => item && index < size);
    if(!users){
      throw boom.notFound('No hay artistas');
    }else if(users.length <= 0){
      throw boom.notFound('No se encontro artistas');
    }
    return users;
  }

  //Crear post
  create(data){
    const newUser = {
      id: faker.datatype.uuid(),
      ...data//Pasar toos los elementos en data
    }

    this.users.push(newUser);
    return newUser;
  }

  findOne(id){
    const user = this.users.find((item) => item.id === id);
    if(!user){
      throw boom.notFound('No existe el artista');
    }
    return user;
  }


  findByCategory(category){
    const users = this.users.find((item) => item.category === category);
    if(!users){
      throw boom.notFound('No hay artistas con esta categoria');
    }
    return users;
  }

  update(id, changes){
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('usuario no encontrado')
      //throw new Error('Post no encontrado'); //forma tradicional
    }

    var currentUser = this.users[index];
    this.users[index] = {
      ...currentUser, //old data
      ...changes  //new data
    };

    return {
      original: currentUser,
      updated: this.users[index]
    };
  }

  //Borrar usuario
  delete(id){
    const index = this.users.findIndex(item => item.id === id);
    console.log("Index: " + index);
    if(index === -1){
      throw boom.notFound('El usuario no existe');
    }
    var currentUser = this.users[index];
    this.users.splice(index, 1);
    return currentUser;
  }
}

module.exports = UserService;
