const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
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

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[2]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);
  expect(titles).toContain("Foundation");
});

afterAll(() => {
  mongoose.connection.close();
});
