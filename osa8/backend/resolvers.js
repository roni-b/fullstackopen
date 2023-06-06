const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/person')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      return args.genre ? Book.find({ genres: { $in: [args.genre] } }) : Book.find({})
    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      const find = await Author.findOne({ name: args.author })
      if (!find) {
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new GraphQLError('Saving new user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }
      const author = await Author.findOne({ name: args.author })

      let newBook = { ...args }
      newBook.author = author

      const book = new Book(newBook)

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book.save()
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      return author.save()
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
                error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user.id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }

  },
  Book: {
    author: async (root) => {
      const author = await Author.findOne({ _id: root.author })
      return {
        name: author.name,
        born: author.born
      }
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.collection.countDocuments({ author: root._id })
      return books
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers