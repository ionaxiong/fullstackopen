const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// get all blogs, refactored
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

//get blog by id, refactored
blogsRouter.get("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

//post blog, refactored
blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
  });
  const savedBlog = await blog.save();
  response.json(savedBlog.toJSON());
});

//delete blog, refactored
blogsRouter.delete("/:id", async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", (request, response) => {
  const body = request.body;

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
