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
  }

  type Mutation {
    addUser(firstname: String!, lastname: String!, email: String!, password: String!): Boolean!
    addContact(
      userEmail: String!
      firstname: String
      lastname: String
      email: String
      phone: String
      address: String
      note: String
    ): Boolean!
  }
`;
