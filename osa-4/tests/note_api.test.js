const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/blog')
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
beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialBlogs[0])
  await noteObject.save()
  noteObject = new Note(initialBlogs[1])
  await noteObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('there are two notes', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('Otsikko')
})
test('Id is id, not _id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})
test('Able to post new blog and lenght goes ++', async () => {
  const response = await api.get('/api/blogs')
  const x = response.body.length

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
  const response2 = await api.get('/api/blogs')
  expect(response2.body.length === x+1)
})
test ('Likes test', async () => {
  const response = await api.get('/api/blogs')

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


afterAll(() => {
  mongoose.connection.close()
})