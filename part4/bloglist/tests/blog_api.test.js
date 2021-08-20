const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  //recreate users
  await User.deleteMany({});
  let userObjects = helper.initialUsers.map((user) => new User(user));
  const promiseUserArray = userObjects.map((u) => u.save());
  await Promise.all(promiseUserArray);

  //recreate blogs
  await Blog.deleteMany({});
  let blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  blogObjects[0].user = await User.findOne({ username: "mingx" });
  blogObjects[1].user = await User.findOne({ username: "mingx" });
  blogObjects[2].user = await User.findOne({ username: "root" });

  const promiseBlogArray = blogObjects.map((b) => b.save());
  await Promise.all(promiseBlogArray);
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
    const response = await api
      .post("/api/login")
      .send({ username: "mingx", password: "hello" });
    const token = response.body.token;

    const newBlog = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      url: "http://thegreatgatsby.com",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .auth(token, { type: "bearer" })
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain("The Great Gatsby");
  });

  test("default value of likes is 0", async () => {
    const response = await api
      .post("/api/login")
      .send({ username: "mingx", password: "hello" });
    const token = response.body.token;

    const newBlog = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      url: "http://thegreatgatsby.com",
    };

    await api
      .post("/api/blogs")
      .auth(token, { type: "bearer" })
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
    const response = await api
      .post("/api/login")
      .send({ username: "mingx", password: "hello" });
    const token = response.body.token;

    const newBlog = {
      author: "F. Scott Fitzgerald",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .auth(token, { type: "bearer" })
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const response = await api
      .post("/api/login")
      .send({ username: "mingx", password: "hello" });
    const token = response.body.token;

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .auth(token, { type: "bearer" })
      .expect(204);

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

describe("unauthorized operation", () => {
  test("creation of a blog fails with status code 401", async () => {
    const newBlog = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      url: "http://thegreatgatsby.com",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
