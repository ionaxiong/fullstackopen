var _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.some((blog) => typeof blog.likes !== "number")) {
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

const favoriteBlog = (blogs) => {
  if (blogs.some((blog) => typeof blog.likes !== "number")) {
    throw "likes is not a number!";
  }
  if (blogs.length === 0) {
    return 0;
  }
  const likes = blogs.map((blog) => blog.likes);
  const mostLikes = Math.max(...likes);
  const mostLikedBlog = blogs.find((blog) => blog.likes === mostLikes);

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  const author = _(blogs).countBy("author").entries().maxBy(_.last);

  return {
    author: _.head(author),
    blogs: _.last(author),
  };
};

const mostLikes = (blogs) => {
  const blogsGroupdByAuthor = _.groupBy(blogs, "author");
  const authorsWithLikes = _.map(blogsGroupdByAuthor, (authorInfo, author) => {
    const totalLikes = authorInfo
      .map((x) => x.likes)
      .reduce((sum, likes) => sum + likes);
    return {
      author: author,
      likes: totalLikes,
    };
  });
  const authorWithMostLikes = _.maxBy(authorsWithLikes, "likes");
  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
