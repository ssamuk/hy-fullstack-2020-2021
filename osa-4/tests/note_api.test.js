const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')


// Example of describe
describe('When there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('Blogs are returned as json', async () => {
    console.log('entered tests')
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
  })
})
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})
test('the first blog is about HTTP methods', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('Otsikko')
})
test('Id is id, not _id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})
test('Able to post new blog and lenght goes ++', async () => {
  const newBlog = {
    'title': 'Otsikko',
    'author': 'Samu ',
    'url': 'www.google.fi',
    'likes': 65
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
  const title = blogsAtEnd.map(n => n.title)
  expect(title).toContain(
    'Otsikko'
  )
})
test ('Likes test', async () => {

  const newBlog = {
    'title': 'Otsikko',
    'author': 'Samu ',
    'url': 'www.google.fi'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
  const response2 = await api.get('/api/blogs')
  expect(response2.body[response2.body.length-1].likes).toBe(0)
})
test ('Not enought info works?', async () => {
  const newBlog = {
    'author': 'Samu ',
    'url': 'www.google.fi'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})
test ('Delete post', async () => {
  const response = await api.get('/api/blogs')
  await api
  // Note using ` not '...
    .delete(`/api/blogs/${response.body[0].id}`)
    .expect(204)
  const response2 = await api.get('/api/blogs')
  expect(response2.body.length).toBe(response.body.length-1)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })  
})

afterAll(() => {
  mongoose.connection.close()
})