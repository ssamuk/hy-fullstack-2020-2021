import React from 'react'
import Blog from './Blog'

const BlogsList = ({blogs, user, handleLogout, updateBlog}) => {
    
    return (
      
        <div>
            <p>{user.username} logged in <button type="submit" onClick={handleLogout}>Logout</button></p>
            <h2>blogs</h2>
              {blogs.map(blog =>
                <Blog 
                key={blog.id} 
                blog={blog} 
                updateBlog = {updateBlog}/>
              )}
        </div>
    )
}


export default BlogsList