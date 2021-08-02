import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogsList from './components/BlogsList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newMessage, setNewMessage] = useState('')

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

  const blogFormRef = useRef()

  const notifyUser = (message) => {
  setNewMessage(message)
  setTimeout(() => {
    setNewMessage('')
  }, 5000)
  }

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
      notifyUser('Wrong credentials')
    }
  }

  const updateBlog = async (blog) => {
    try{
      console.log('We are here', blog)
      const newLikes = blog.likes + 1
      const id = blog.id
      console.log(newLikes, id)
    
      const liked = {
        ...blog,
        likes: newLikes
      }
      console.log('liked = ', liked)



      const updatedBlog = await blogService.update(id, liked)





      console.log('We are rolling and saving things')
      const newBlogs = blogs.map((blog) => blog.id === updatedBlog.id 
      ? updatedBlog : blog)
      setBlogs(newBlogs)
    }
    catch(exception){
      notifyUser('Something went wrong :S')
    }
  }

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()

    try{
      const newBlog = await blogService.create(blog)
      await setBlogs(blogs.concat(newBlog))
      notifyUser(blog.title + ' added to list!')
    }catch(exception){
    notifyUser('Something went wrong!')
    }
  }
  
  
  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )
  
  const blogForm = () => (
    <div>
      <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
        <BlogForm
        createBlog = {addBlog}
        updateBlog = {updateBlog}
        />
      </Togglable>
      <BlogsList 
      updateBlog = {updateBlog}
      blogs={blogs}
      user={user}
      handleLogout={handleLogout}/>
     </div>
  )

  

  return (
    <div>
      <h1>{newMessage}</h1>
      {user === null ?
        loginForm()
        : 
        blogForm()
      }
    </div>
  )
}

export default App