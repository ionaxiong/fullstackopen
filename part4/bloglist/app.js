const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URL);

mongoose
.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
.then(() => {
  logger.info("connected to MongoDB");
})
.catch((error) => {
  logger.error("error connection to MongoDB:", error.message);
});

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknowEndPoint)
app.use(middleware.errorHandler)

module.exports = app;
