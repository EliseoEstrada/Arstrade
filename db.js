const db = require('mongoose');
db.Promise = global.Promise;

const connect = async (url) => {
  await db.connect(url, {
    useNewUrlParser: true //compatibilidad de servidor
  });
  console.log("Conectado a base de datos");
}

module.exports = connect;
