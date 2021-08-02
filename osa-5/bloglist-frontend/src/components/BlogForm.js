import React, { useState } from 'react'

const BlogForm = ({createBlog}) => {


  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 

  const addBlog = (event) => {
    event.preventDefault()
    
    createBlog({
      title, author, url
    })
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
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
              onChange={({target}) => setTitle(target.value)}
            />
        </div>
        <div>
            Author
            <input
              type="text"
              value={author}
              name="Author"
              id="author"
              onChange={({target}) => setAuthor(target.value)}
            />
        </div>
        <div>
            Url
            <input
              type="text"
              value={url}
              name="URL"
              id="url"
              onChange={({target}) => setUrl(target.value)}
            />
        </div>
        <button type="submit">post</button>
      </form></div>
    
    
  </div>
  )
}

export default BlogForm