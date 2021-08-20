const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    author: "Asimov",
    title: "Foundation",
    url: "http://foundation.com",
    likes: 1000,
    user: null
    // user: initialUsers[0], 
  },
  {
    author: "Daniel Kahneman",
    title: "Thinking, Fast and Slow",
    url: "http://thinkingfastandslow.com",
    likes: 123,
    user: null
    // user: initialUsers[0],
  },
  {
    author: "Harper Lee",
    title: "To Kill a Mockingbird",
    url: "http://tokillamockingbird.com",
    likes: 100,
    user: null
    // user: initialUsers[1],
  },
];

const initialUsers = [
  {
    username: "mingx",
    passwordHash: "$2b$10$apTnGgN15m.yAlKQTStNUeI1IqGG6imronfdU1FXuPBtfuP0eJ9bm",
    blogs: []
    // blogs: [initialBlogs[0], initialBlogs[1]],
  },
  {
    username: "root",
    passwordHash: "$2b$10$f96RMBAFp8wyF88l28iBSO9ditDyIS56O3hOjAUehW2DTqhFEesMe",
    blogs: []
    // blogs: [initialBlogs[2]],
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

const usersInDb = async () => {
  const users = await User.find({});
  return users;
};

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
