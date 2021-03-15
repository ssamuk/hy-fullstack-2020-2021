const { TestScheduler } = require('@jest/core')
const { values } = require('lodash')
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
  const author = Object.keys(authors)
  let max = Math.max(...vals)
  console.log('Authors are: ', authors, 'and max number is ', max)
  const result = authors.filter(author => author.values == max)
  console.log(result)
  return result

}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}
