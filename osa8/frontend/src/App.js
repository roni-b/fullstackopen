import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate
} from 'react-router-dom'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommends from './components/Recommends'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries.js'

const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const updateCache = (cache, query, addedBook) => {
  // Helper function to eliminate saving the same book twice
  const uniqByTitle = (books) => {
    const seenTitles = new Set()
    return books.filter((book) => {
      const title = book.title
      if (seenTitles.has(title)) {
        return false
      } else {
        seenTitles.add(title)
        return true
      }
    })
  }

  cache.modify({
    fields: {
      allBooks(existingBooks = []) {
        return uniqByTitle([...existingBooks, addedBook])
      },
    },
  })
}

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem('bookapp-user-token') || null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      alert(`a new book with title '${addedBook.title}' added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const padding = {
    padding: 5
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (!token) {
    return (
      <Router>
        <div>
          <div>
            <Link style={padding} to='/authors'>authors</Link>
            <Link style={padding} to='/books'>books</Link>
            <Link style={padding} to='/login'>login</Link>
          </div>
          <Routes>
            <Route path='/authors' element={<Authors token={token} />} />
            <Route path='/books' element={<Books />}/>
            <Route path='/*' element={<Navigate to='/authors' replace />} />
            <Route path='/login' element={<Login setToken={setToken} setError={notify} />} />
          </Routes>
          <Notify errorMessage={errorMessage} />
        </div>
      </Router>
    )
  }
  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to='/authors'>authors</Link>
          <Link style={padding} to='/books'>books</Link>
          <Link style={padding} to='/newbook'>add new book</Link>
          <Link style={padding} to='/recommend'>recommend</Link>
          <button onClick={logout}>logout</button>
        </div>
        <Routes>
          <Route path='/authors' element={<Authors token={token} />} />
          <Route path='/books' element={<Books />}/>
          <Route path='/*' element={<Navigate to='/authors' replace />} />
          <Route path='/newbook' element={<NewBook />} />
          <Route path='/recommend' element={<Recommends />} />
        </Routes>
        <Notify errorMessage={errorMessage} />
      </div>
    </Router>
  )
}

export default App
