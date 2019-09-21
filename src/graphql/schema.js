import { GraphQLSchema } from 'graphql';

import query from './schemaQuery';
// import mutation from './schemaMutation';

export const schema = new GraphQLSchema({
    query: query,
    // mutation: mutation
});
