import React from "react";

const BlogForm = (props) => {
  return (
    <div>
        <h2>Create a new blog</h2>
      <form onSubmit={props.addBlog}>
        <div>
          title:
          <input
            type="text"
            value={props.title}
            name="Title"
            onChange={props.handleTitleChange}
          ></input>
        </div>
        <div>
          author:
          <input
            type="text"
            value={props.author}
            name="Author"
            onChange={props.handleAuthorChange}
          ></input>
        </div>
        <div>
          url:
          <input
            type="text"
            value={props.url}
            name="Url"
            onChange={props.handleUrlChange}
          ></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
