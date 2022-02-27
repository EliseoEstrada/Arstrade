//const res = require("express/lib/response");

const logErrors = (err, req, res, next) => {
  console.log(err);
  next(err);
}

const boomErrorHandler = (err, req, res, next) => {
  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);

/*
    let errorObject = {}
    const {output: {statusCode, payload}} = err;
    errorObject = {statusCode, payload}
    res.status(errorObject.statusCode).json(errorObject)
    */
  }
  next(err);
}

const errorHandler = (err, req, res) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}



module.exports = {logErrors, boomErrorHandler, errorHandler};
