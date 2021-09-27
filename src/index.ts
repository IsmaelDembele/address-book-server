import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema";
import { Query } from "./graphql/revolvers/Query";
import { Mutation } from "./graphql/revolvers/Mutation";

import {
  createContactTable,
  createUserTable,
  addUser,
  deleteUser,
  findUserByEmail,
  deleteContact,
  getContact
} from "./utils";

const contacts = [
  {
    id: 1,
    userEmail: "dembele@gmail.com",
    firstname: "contact1",
    lastname: "Dembele",
    email: "contact1@gmail.com",
    phone: "757 224 1454",
    address: "12345 Mcknight Dr, Pittsburgh PA 15237",
    note: "I met him in Newport News Va",
  },
  {
    id: 2,
    userEmail: "dembele@gmail.com",
    firstname: "contact2",
    lastname: "Dembele",
    email: "contact2@gmail.com",
    phone: "757 224 4457",
    address: "1 Washington blv, Newport News VA 23608",
    note: "I met him in Houston, TX",
  },
];

const users = [
  {
    firstname: "Ismael",
    lastname: "Dembe",
    email: "dembele@gmail.com",
    password: "12345",
    contacts: contacts,
  },
  {
    firstname: "Mohamed",
    lastname: "Dembele",
    email: "mohamed@gmail.com",
    password: "12345",
    contacts: contacts,
  },
];

// createUserTable();
// createContactTable();
// findUserByEmail('dembele@gmail.com');
// findUserByEmail('testemail');
//  addUser(users[1].email,users[1].firstname,users[1].lastname,users[1].password);
// deleteUser('dembele.ismael@gmail.com');
// deleteContact('hi@hi.com',1);
// getContact('hi@hi.com');

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation },
  context: {
    users,
    contacts,
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
