const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((b) => b.save());
  await Promise.all(promiseArray);
});

describe("when there is initially some blogs saved", () => {
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
});

describe("addition of a new blog", () => {
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

  test("default value of likes is 0", async () => {
    const newBlog = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      url: "http://thegreatgatsby.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAtEnd.find((blog) => blog.title === newBlog.title).likes).toBe(
      0
    );
  });

  test("creating new blogs via the /api/blogs endpoint", async () => {
    const newBlog = {
      author: "F. Scott Fitzgerald",
      likes: 10,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("update of a blog", () => {
  test("succeeds with status code 200", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 1234567,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const likes = blogsAtEnd.map((b) => b.likes);
    expect(likes).toContain(updatedBlog.likes);
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mingx",
      name: "ming xiong",
      password: "helloworld",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper status code and message if username already taken", async () => {
    const userAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "superUser",
      password: "helloSuperTest",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const userAtEnd = await helper.usersInDb();
    expect(userAtEnd).toHaveLength(userAtStart.length);
    expect(userAtEnd).not.toContain(newUser.name);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
