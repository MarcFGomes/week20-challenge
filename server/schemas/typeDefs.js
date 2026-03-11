const typeDefs = `
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveTitle(input: TitleInput!): User
    removeTitle(imdbID: ID!): User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    titleCount: Int
    savedTitles: [Title]
  }

  type Title {
    imdbID: ID!
    title: String
    year: String
    type: String
    poster: String
    plot: String
    imdbRating: String
    imdbLink: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input TitleInput {
    imdbID: ID!
    title: String
    year: String
    type: String
    poster: String
    plot: String
    imdbRating: String
    imdbLink: String
  }
`;

module.exports = typeDefs;