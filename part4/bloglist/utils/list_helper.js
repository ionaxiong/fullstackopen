const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.some((blog) => typeof(blog.likes) !== "number")) {
    throw "likes is not a number!";
  }
  if (blogs.length === 0) {
    return 0;
  }
  const likes = blogs
    .map((blog) => blog.likes)
    .reduce((sum, likes) => sum + likes);

  return likes;
};

module.exports = {
  dummy,
  totalLikes
};
