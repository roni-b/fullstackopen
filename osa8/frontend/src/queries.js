import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query($genre: String) {
    allBooks(
      genre: $genre
    ) {
      title
      published
      genres
      author {
        name
        born
      }
    }
  }
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
    }
  }
`

export const ADD_BOOK = gql`
  mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook (
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation($name: String!, $born: Int!) {
    editAuthor(
      name: $name
      setBornTo: $born
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`