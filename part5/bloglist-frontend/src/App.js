import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Warning from './components/Warning'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  //user attributes
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //blog attributes
  const [blogs, setBlogs] = useState([])

  const noteFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            password={password}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </Togglable>
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (blog) => {
    try {
      noteFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blog)
      setBlogs([...blogs, newBlog])
      setSuccessMessage(`a new blog ${blog.title}! by ${blog.author} added `)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    try {
      const newBlog = {
        ...blog,
        likes: blog.likes + 1,
      }
      const id = blog.id
      const updatedBlog = await blogService.update(id, newBlog) // update single blog
      const blogIndex = blogs.findIndex((b) => b.id === id) // find blog in array to update
      const updatedBlogs = [...blogs] // copy blogs to make react rerender
      updatedBlogs[blogIndex] = updatedBlog // update blog at index
      setBlogs(updatedBlogs) // set blog state
      setSuccessMessage(`you liked ${blog.title}! by ${blog.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = async (blog) => {
    try {
      const id = blog.id
      if (window.confirm(`Remove blog ${blog.title}! by ${blog.author}`)) {
        await blogService.remove(id)
        const updatedBlogs = blogs.filter((b) => b.id !== id)
        setBlogs(updatedBlogs)
        setSuccessMessage(`Remove blog ${blog.title}! by ${blog.author}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogFrom = () => (
    <Togglable buttonLabel="new blog" ref={noteFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Warning message={errorMessage} />
      <Notification message={successMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {user.name} logged-in
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
          {blogFrom()}
          <br />
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleDeleteBlog={handleDeleteBlog}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
