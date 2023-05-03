const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {
  beforeEach(async() => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog identification field is named as field', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  describe('adding new blogs', () => {
    test('adding new valid blog', async () => {
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
      await user.save()
      const users = await helper.usersInDb()

      const usr = {
        username: 'root',
        password: 'sekret'
      }
      const login = await api
        .post('/api/login')
        .send(usr)
      const token = login.body.token

      const obj = {
        title: 'New blog',
        author: 'Aku',
        url: 'akuankka',
        likes: 100,
        userId: users[0].id
      }
      await api
        .post('/api/blogs')
        .send(obj)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const contents = response.body.map(r => r.title)

      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
      expect(contents).toContain('New blog')
    })

    test('if likes not setted, it should be 0', async () => {
      const obj = {
        title: 'Test',
        author: 'mikki',
        url: 'urladdress'
      }
      await api
        .post('/api/blogs')
        .send(obj)

      const response = await api.get('/api/blogs')
      const content = response.body.filter(r => r.title === 'Test')
      expect(content.likes === 0)
    })

    test('if new blog is missing title or url', async () => {
      const obj = {
        title: 'Blogi',
        author: 'Joku',
        likes: 10,
      }
      await api
        .post('/api/blogs')
        .send(obj)
        .expect(400)
      const obj2 = {
        author: 'Joku',
        url: 'joku',
        likes: 10,
      }
      await api
        .post('/api/blogs')
        .send(obj2)
        .expect(400)
    })

  })

  describe('deletion of a blog', () => {
    test('if id is valid, then status code 204 is responded', async () => {
      const blogsAtFirst = await helper.blogsInDb()
      const blogToDelete = blogsAtFirst[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )
      const contents = blogsAtEnd.map(r => r.id)
      expect(contents).not.toContain(blogToDelete.id)

    })
  })

  describe('updating a blog', () => {
    test('updating likes of a blog successfully', async () => {
      const blogsBefore = await helper.blogsInDb()
      const blogToUpdate = blogsBefore[0]

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .expect(201)

      const blogsAfter = await helper.blogsInDb()
      const updatedBlog = blogsAfter[0]

      expect(blogToUpdate.likes !== updatedBlog.likes)
    })
  })
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
      username: 'asdasd',
      name: 'dsdsdsd',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
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

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '12',
      name: 'Name',
      password: 'Secret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter than the minimum allowed length')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Usr1',
      name: 'Name',
      password: 'PW',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is too short')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

// test('blogs are returned as json', () => {
//   return api
//     .get('/api/blogs')
//     .expect(201)
//     .expect('Content-Type', /application\/json/)
//     .then(response => {
//       expect(response.body).toHaveLength(initialBlogs.length)
//     })
// })