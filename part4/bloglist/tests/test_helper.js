const Blog = require("../models/blog");

const initialBlogs = [
  {
    author: "Asimov",
    title: "Foundation",
    url: "http://foundation.com",
    likes: 1000,
  },
  {
    author: "Daniel Kahneman",
    title: "Thinking, Fast and Slow",
    url: "http://thinkingfastandslow.com",
    likes: 123,
  },
  {
    author: "Harper Lee",
    title: "To Kill a Mockingbird",
    url: "http://tokillamockingbird.com",
    likes: 100,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    author: "willremovethissoon",
    title: "willremovethissoon",
    url: "http://willremovethissoon.com",
    likes: 0,
  });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs;
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
