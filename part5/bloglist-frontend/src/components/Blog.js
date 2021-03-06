import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDeleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenInvisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="blogStyle">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenInvisible}>
        <span> {blog.title} <button onClick={toggleVisibility}>hide</button> </span><br/>
        <span> {blog.url} </span><br/>
        <span> likes {blog.likes} <button onClick={() => handleLike(blog)} >like</button></span><br/>
        <span> {blog.author} </span><br/>
        <button style={{ color: 'blue' }} onClick={() => handleDeleteBlog(blog)} >remove</button>
      </div>
    </div>
  )
}

export default Blog
