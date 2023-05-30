import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const sclice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    replaceBlog(state, action) {
      const replaced = action.payload
      return state.map(s => s.id===replaced.id ? replaced : s)
    },
    blogRemoved(state, action) {
      return state
    }
  },
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (object) => {
  return async dispatch => {
    const blog = await blogService.create(object)
    dispatch(addBlog(blog))
  }
}

export const updateBlog = (object) => {
  return async dispatch => {
    const blog = await blogService.update(object)
    dispatch(replaceBlog(blog))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(blogRemoved())
    dispatch(initializeBlogs())
  }
}

export const addCommentToBlog = (id, comment) => {
  return async dispatch => {
    const blog = await blogService.addComment(id, comment)
    dispatch(replaceBlog(blog))
  }
}

export const { addBlog, setBlogs, replaceBlog, blogRemoved } = sclice.actions
export default sclice.reducer