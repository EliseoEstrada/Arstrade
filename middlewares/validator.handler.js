const boom = require('@hapi/boom');

//dto = data transfer object = modelo de datos/modelo de criterios
//dto = criterios
const validatorHandler = (dto, prop) => {
  return (req, res, next) => {
    const data = req[prop];
    const { error } = dto.validate(data);
    if(error){
      next(boom.badRequest(error))
    }
    next(); //rutas
  };
}

module.exports = validatorHandler;
