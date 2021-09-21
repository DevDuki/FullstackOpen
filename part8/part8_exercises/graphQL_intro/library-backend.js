const { ApolloServer, gql } = require('apollo-server')
const { v4: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

JWT_SECRET = 'someSecret'

const MONGODB_URI = 'mongodb+srv://fullstack:fullstack@fullstackopencluster.x9dwg.mongodb.net/graphql?retryWrites=true&w=majority'

console.log('connecting to MongoDB', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(err => console.log('error connecting to MongoDB: ', err.message))

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login (
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Author: {
    bookCount: (root, args) => {
      const booksFromAuthor = Book.find({ author: root.name })
      const bookCountOfAuthor = booksFromAuthor.length
      return bookCountOfAuthor
    }
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      // const author = args.author
      // const genre = args.genre

      // if(!author && !genre) return books

      // const booksFromAuthor = books.filter(book => author ? book.author === author : true) // If an author is given in the paramter, filter by it, otherwise return all books again
      // const booksFromAuthorAndGenre = booksFromAuthor.filter(book => genre ? book.genres.includes(genre) : true)

      return Book.find({})
    },
    allAuthors: (root, args) => Author.find({}),
    me: (root, args, context) => {
      console.log(context)
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      const { author } = args

      if(!currentUser){
        throw new AuthenticationError('not authenticated')
      }

      const newBook = new Book( { ...args } )

      const authorAlreadyExists = await Author.findOne({ name: author })

      try {
        if(!authorAlreadyExists){
          const newAuthor = new Author({ name: author })
          await newAuthor.save()
        }

        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return newBook
    },
    editAuthor: async (root, args, { currentUser }) => {
      const { name, setBornTo } = args

      if(!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: name })

      if(!author) return null

      author.born = setBornTo

      return author.save()
    },
    createUser: (root, args) => {
      const {
        username,
        favoriteGenre
      } = args
      console.log(favoriteGenre)
      const newUser = new User({ username, favoriteGenre })

      return newUser.save()
    },
    login: (root, args, context) => {

      console.log(context)
      const user = User.findOne({ username: args.username })

      if(!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)


      const currentUser = await User.findById(decodedToken.iat.toString())
      console.log(currentUser)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})