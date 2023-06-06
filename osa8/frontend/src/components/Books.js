import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = () => {
  const [ genre, setGenre ] = useState(null)
  const genresQuery = useQuery(ALL_BOOKS)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
    refetchQueries: [{ query: ALL_BOOKS } ]
  })

  if (result.loading || !result.data || genresQuery.loading || !genresQuery.data) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const genres = genresQuery.data.allBooks.flatMap((b) => b.genres).filter((genre) => genre !== '')

  const genreHandler = (selectedGenre) => {
    setGenre(selectedGenre)
    result.refetch()
  }

  return (
    <div>
      <h2>books</h2>
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
      {genres.map((g, i) => <button key={i} onClick={() => genreHandler(g)}>{g}</button>)}
      {genre && <p>Selected genre: {genre}</p>}
    </div>
  )
}

export default Books
