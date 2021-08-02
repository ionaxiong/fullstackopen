const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// get all data
blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs.map((blog) => blog.toJSON()));
  });
});

// get data by id
blogsRouter.get('/:id', (request, response, next) => {
    
})



module.exports = blogsRouter