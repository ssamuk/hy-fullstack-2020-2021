import React, {useState} from 'react'

const Blog = ({blog, updateBlog}) => {

  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = () => {
    setShowInfo(current => !current)
  }

  if (showInfo === false){
    return(
      <div style={blogStyle}>
      
        <b>Title:</b> {blog.title} <b>Author:</b> {blog.author}
        <button onClick={handleClick}>
          View
        </button>
      
    </div>
    )
  }else{
    return(
      <div style={blogStyle}>
      <table>
          <tr><b>Title: </b> {blog.title}</tr>
          <tr><b>Author: </b> {blog.author}</tr>
          <tr><b>Url: </b> {blog.url}</tr>
          <tr><b>Likes: </b> {blog.likes} <button onClick={() => updateBlog(blog)}>like</button></tr>
          <tr><b>Added: </b>{blog.user.name}</tr>
          </table>
        <div>
          <button onClick={handleClick}>
            Hide
          </button>
         </div>
    </div>
    )
  }
}
export default Blog