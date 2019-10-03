import { GraphQLSchema } from 'graphql';

import query from './schemaQuery';
import mutation from './schemaMutation';
import { subscription } from './schemaSubscription';

export const schema = new GraphQLSchema({
    query: query,
    mutation: mutation,
    subscription: subscription
});
