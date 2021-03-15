const { TestScheduler } = require('@jest/core')
const _ = require('lodash')

const dummy = () => {
  return 1
}
  
const totalLikes = (blogs) => {
  return (
    blogs.reduce((sum, blogs) => {
      return sum + blogs.likes
    }, 0)
  )
}
const favouriteBlog = (blogs) => {
  let liked = blogs.reduce((blog, currentValue, index) => {
    if (index === 0) {
      return currentValue
    }
    return blog.likes > currentValue.likes ? blog : currentValue
  })
  return {
    title: liked.title,
    author: liked.author,
    likes: liked.likes
  }
}
const mostBlogs = (blogs) => {
  let authors = _.countBy(blogs, 'author')
  const vals = Object.values(authors)
  let max = Math.max(...vals)
  console.log('Max is: ', max)
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}
