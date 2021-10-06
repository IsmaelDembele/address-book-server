"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./graphql/schema");
const Query_1 = require("./graphql/revolvers/Query");
const Mutation_1 = require("./graphql/revolvers/Mutation");
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: { Query: Query_1.Query, Mutation: Mutation_1.Mutation },
});
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
