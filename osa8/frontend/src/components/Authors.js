import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from '../queries'

const Authors = ({ token }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const[ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ]
  })

  const result = useQuery(ALL_AUTHORS)

  if (result.loading || !result.data) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const updateHandler = async (event) => {
    event.preventDefault()

    if (!name || !born) {
      return
    }

    editAuthor({ variables: {name, born: Number(born) } })

    setName('')
    setBorn('')
  }

  const birthyearForm = () => {
    if (!token) {
      return null
    }
    return (
      <div>
        <h2>set birthyear</h2>
        <form onSubmit={updateHandler}>
          <div>author</div>
          <div>
            <select onChange={({ target }) => setName(target.value)}>
              <option defaultValue={null}></option>
              {authors.map((a, index) => <option key={index}>{a.name}</option>)}
            </select>
          </div>
          <div>year</div>
          <input type='number' name='born' defaultValue={1900} onChange={({ target }) => setBorn(target.value)} />
          <input type='submit' value='update author'/>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {birthyearForm()}
    </div>
  )
}

export default Authors
