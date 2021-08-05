const listHelper = require("../utils/list_helper");

describe("dummy", () => {
  test("dummy return one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});
