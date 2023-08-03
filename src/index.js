import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import mocks from './mock.js'

// Read schema from file
const typeDefs = readFileSync('./schema.graphql', 'utf8');
// Create schema
const schema = makeExecutableSchema({ typeDefs });
// Create ApolloServer instance
const server = new ApolloServer({
    schema: addMocksToSchema({
        schema,
        mocks
    }),
    introspection: true
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
