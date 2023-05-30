import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import storageService from '../services/storage'
import { setNotification } from './notificationReducer'

const sclice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  },
})

export const userLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      storageService.saveUser(user)
      dispatch(setUser(user))
      dispatch(setNotification(`${username} logged in`, 5))
    }
    catch (e) {
      dispatch(setNotification('wrong username or password', 5))
    }
  }
}

export const userLogout = () => {
  return async dispatch => {
    storageService.removeUser()
    dispatch(setNotification('logged out', 5))
    dispatch(setUser(null))
  }
}

export const getLoggedUser = () => {
  return async dispatch => {
    const user = storageService.loadUser()
    dispatch(setUser(user))
  }
}

export const { setUser } = sclice.actions
export default sclice.reducer