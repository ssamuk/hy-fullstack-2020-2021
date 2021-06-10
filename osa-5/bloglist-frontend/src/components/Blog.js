import React from 'react'
const Blog = ({blog}) => (
  <div>
    <p><b>Title:</b> {blog.title} <b>Author:</b> {blog.author}</p>
  </div>  
)

export default Blog