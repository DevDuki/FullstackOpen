const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v4: uuid } = require('uuid')

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Duki King",
    phone: "040-1231233",
    street: "Skrreeet 15 A",
    city: "Bern",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Jeff Bezos",
    street: "Somethingstreen 10",
    city: "Murica",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
]

const typeDefs = gql`

  type Address {
      street: String!
      city: String!
    }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }  

  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
  }
`

const resolvers = {
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  },

  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if(!args.phone) {
        return persons
      }

      const byPhone = (person) => args.phone === 'YES' ? person.phone : !person.phone

      return persons.filter(byPhone)
    },
    findPerson: (root, args) => persons.find(p => p.name === args.name)
  },

  Mutation: {
    addPerson: (root, args) => {
      if(persons.find(p => p.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name,
        })
      }

      const person = { ...args, id: uuid() }
      persons = persons.concat(person)
      return person
    },
    editNumber: (root, args) => {
      const person = persons.find(p => p.name === args.name)

      if(!person) {
        return null
      }

      const updatedPerson = { ...person, phone: args.phone}
      persons = persons.map(p => p.name === args.name ? updatedPerson : p)
      return updatedPerson
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })