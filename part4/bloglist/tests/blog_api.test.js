const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((b) => b.save());
  await Promise.all(promiseArray);
});

describe("blog list tests", () => {
  test("all blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect((res) => res.body.length === helper.initialBlogs.length)
      .expect("Content-Type", /application\/json/);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test("new blog can be created successfully", async () => {
    const newBlog = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      url: "http://thegreatgatsby.com",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain("The Great Gatsby");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
