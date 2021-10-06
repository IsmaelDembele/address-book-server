import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema";
import { Query } from "./graphql/revolvers/Query";
import { Mutation } from "./graphql/revolvers/Mutation";
import { createContactTable, createUserTable } from "./utils";

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation },
});

createUserTable();
createContactTable();

// The `listen` method launches a web server.
server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
