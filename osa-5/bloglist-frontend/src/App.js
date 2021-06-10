import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    try {
      await window.localStorage.removeItem('loggedBlogUser')
      setUser(null)
    }
    catch{
      console.log('Something went wrong!')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const addBlog = async (event) => {

    const newObject = {
      title: title,
      author: author,
      url: url
    }
    console.log(newObject)
    await blogService.create(newObject)
    await setBlogs(blogs.concat(blogs))
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  
  const blogForm = () => (
    <div>
     <div>
    <h3>Post new</h3>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
              type="text"
              value={title}
              name="Title"
              id="title"
              onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
            Author
            <input
              type="text"
              value={author}
              name="Author"
              id="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
            Url
            <input
              type="text"
              value={url}
              name="URL"
              id="url"
              onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button type="submit">post</button>
      </form></div>
    <p>{user.username} logged in <button type="submit" onClick={handleLogout}>Logout</button></p>
    <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  </div>
  )
  

  return (
    <div>
      <h1>{errorMessage}</h1>
      {user === null ?
      loginForm() : blogForm()}
    </div>
  )
}

export default App