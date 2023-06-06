import { useQuery } from '@apollo/client'
import { CURRENT_USER, ALL_BOOKS} from '../queries'
import { useEffect, useState } from 'react'

const Recommends = () => {
  const user = useQuery(CURRENT_USER)
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    if (user.data) {
      const favoriteGenre = user.data.me.favoriteGenre
      setGenre(favoriteGenre)
    }
  }, [user.data])

  const booksQuery = useQuery(ALL_BOOKS, {
    variables: { genre },
    refetchQueries: [{ query: ALL_BOOKS } ],
    skip: !genre
  })

  if (user.loading || booksQuery.loading || !booksQuery.data) {
    return <div>loading...</div>
  }

  const favoriteGenre = user.data.me.favoriteGenre
  const books = booksQuery.data.allBooks

  return (
    <div>
      <h1>recommendations</h1>
      <div>books in your favorite genre <b>{favoriteGenre}</b></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommends