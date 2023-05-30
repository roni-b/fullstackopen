import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@mui/material'
import styled from 'styled-components'
import { Button } from '@mui/material'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, updateBlog, removeBlog, addCommentToBlog } from './reducers/blogReducer'
import { getLoggedUser, userLogin, userLogout } from './reducers/userReducer'
import { getUsers, addUsers } from './reducers/usersReducer'

import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import BlogPage from './components/BlogPage'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import usersService from './services/users'

const Navigation = styled.div`
  padding: 0.5em;
  background: lightgrey;
  display: flex;
  border-radius: 10px;

  a {
    margin-right: 0.5em;
  }
`

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const user = useSelector(state => state.user)

  useEffect(() => {
    usersService.getAll().then(users => {
      dispatch(addUsers(users))
      dispatch(getLoggedUser())
      dispatch(initializeBlogs())
    })
  }, [dispatch])

  const users = useSelector(state => state.users)

  const blogs = useSelector(state => state.blogs)

  const notifyWith = (content) => {
    const seconds = 5
    dispatch(setNotification(content, seconds))
  }

  const login = (username, password) => {
    dispatch(userLogin(username, password))
  }

  const logout = () => {
    dispatch(userLogout())
  }

  const createNewBlog = (newBlog) => {
    dispatch(createBlog(newBlog))
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
  }

  const like = (blog) => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    dispatch(updateBlog(blogToUpdate))
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
  }

  const addComment = (id, comment) => {
    dispatch(addCommentToBlog(id, comment))
    notifyWith(`Added a comment '${comment}'`)
  }

  const remove = (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      dispatch(removeBlog(blog.id))
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
    }
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    )
  }

  const sortedBlogs = [...blogs].sort((b1, b2) => b2.likes - b1.likes)

  return (
    <Container>
      <Router>
        <div>
          <Navigation>
            <Link to="/blogs">blogs</Link>
            <Link to="/users">users</Link>
            {user.username} logged in
            <Button onClick={() => logout()}>
              logout
            </Button>
          </Navigation>
          <h2>blog app</h2>
          <Notification />

          <Routes>
            <Route path="/blogs" element={<Blogs sortedBlogs={sortedBlogs} like={like} remove={remove} user={user} createNewBlog={createNewBlog} blogFormRef={blogFormRef} />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User users={users} />} />
            <Route path="/blogs/:id" element={<BlogPage blogs={blogs} like={like} addComment={addComment} />} />
          </Routes>

        </div>
      </Router>
    </Container>
  )
}

export default App