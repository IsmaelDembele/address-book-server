import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema";
import { Query } from "./graphql/revolvers/Query";
import { Mutation } from "./graphql/revolvers/Mutation";

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation },
});

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
