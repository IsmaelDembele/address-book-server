import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    contacts: [Contact]
  }

  type Contact {
    id: Int!
    useremail: String!
    firstname: String!
    lastname: String
    email: String
    phone: String!
    address: String
    note: String
  }

  type Query {
    user(email: String!): User
    getContacts(useremail: String!): [Contact]
    login(email: String!, password: String!): String!
    verifyToken(token: String!, useremail: String!): Boolean!
  }

  type Mutation {
    addUser(firstname: String!, lastname: String!, email: String!, password: String!): Boolean!
    addContact(
      useremail: String!
      firstname: String
      lastname: String
      email: String
      phone: String
      address: String
      note: String
    ): Boolean!
    deleteContact(token: String!, id: Int!): Boolean!
  }
`;
