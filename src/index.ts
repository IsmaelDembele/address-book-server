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
  getContact,
} from "./utils";

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
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
