import {
    connectionArgs
} from 'graphql-relay'

import {
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} from 'graphql';

import { GraphQLJSONObject } from 'graphql-type-json'

const anotherDefaultConnectionArgs = {
    ...connectionArgs,
    first: {
        type: GraphQLInt,
        defaultValue: 10,
    },
    sorts: {
        type: new GraphQLList(new GraphQLList(GraphQLString))
    },
    filters: {
        type: GraphQLList(GraphQLJSONObject)
    },
    search: {
        type: GraphQLString
    },
};

export {
    anotherDefaultConnectionArgs
}
