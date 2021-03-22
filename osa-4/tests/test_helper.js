const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'Otsikko',
    'author': 'Samu ',
    'url': 'www.google.fi',
    'likes': 65
  },
  {
    'title': 'Otsikko',
    'author': 'Samu ',
    'url': 'www.google.fi',
    'likes': 65
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}