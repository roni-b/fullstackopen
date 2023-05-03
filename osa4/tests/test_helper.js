const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'asd',
    url: 'urlosoite',
    likes: 10
  },
  {
    title: 'Browser can execute only JavaScript',
    author: 'Some guy',
    url: 'qwerty',
    likes: 20
  },
]

const initialUsers = [
  {
    username: 'user1',
    name: 'User Name',
    password: 'strongpass123'
  },
  {
    username: 'user2',
    name: 'Second User',
    password: 'password321'
  }
]

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
}