import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const sclice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  },
})

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const addUsers = (users) => {
  return async dispatch => {
    dispatch(setUsers(users))
  }
}

export const { setUsers } = sclice.actions
export default sclice.reducer