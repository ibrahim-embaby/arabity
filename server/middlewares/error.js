// Not Dound Middleware
const notFound = (req, res, next) => {
  const error = new Error(`not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const jwt = require("jsonwebtoken");
const { Error } = require("mongoose");
const ErrorResponse = require("../utils/ErrorResponse.js");

const errorHandler = (error, req, res, next) => {
  let err, status;
  console.log(error);
  if (error instanceof ErrorResponse) {
    status = error.statusCode;
    err = error.message;
  } else if (error instanceof jwt.JsonWebTokenError) {
    status = 401;
    err = error.message;
  } else if (error instanceof Error.ValidationError) {
    const errors = {};
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
    status = 400;
    err = {
      message: "Validation Error",
      errors,
    };
  } else {
    status = 500;
    err = "Internal server error";
  }
  res.status(status).json({
    success: false,
    message: err,
  });
};

module.exports = { errorHandler, notFound };
