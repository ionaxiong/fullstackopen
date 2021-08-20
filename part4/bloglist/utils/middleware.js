const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method", request.method);
  logger.info("Path", request.path);
  logger.info("Body", request.body);
  logger.info("---");
  next();
};

const unknowEndPoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  logger.error(error.message);

  next(error);
};

//https://openclassrooms.com/en/courses/5614116-go-full-stack-with-node-js-express-and-mongodb/5656301-set-up-authentication-middleware
const tokenExtractor = (request, response, next) => {
  const authorization = request.headers.authorization;
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    request.token = token;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(
      request.token,
      process.env.SECRET
    );
    const user = await User.findById(decodedToken.id);
    request.user = user;
  }
  next()
};

module.exports = {
  requestLogger,
  unknowEndPoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
