import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';

import {
    mutationWithClientMutationId
} from 'graphql-relay';

import {
    clientType
} from "../viewer/ClientType";

import originalData from '../../mock/client';
import {addData, findById} from '../../helper/lodashSearch';
import {addNodeDefinition} from "../viewer/GraphQLNodeDef";
import {pubsub} from "../schemaSubscription";

const addDataClientMutation = mutationWithClientMutationId({
    name: 'addDataClientMutation',
    inputFields: {
        name: {
            type: GraphQLNonNull(GraphQLString)
        },
        email: {
            type: GraphQLNonNull(GraphQLString)
        }
    },
    outputFields: {
        viewer: {
            type: clientType
        }
    },
    mutateAndGetPayload: args => {
        const data = addData(originalData, { ...args });
        pubsub.publish('clientAdded');
        return {
            viewer: data
        }
    }
});

addNodeDefinition(
    {
        Client: id => {
            return findById(findById, id)
        },
    },
    {
        Client: clientType,
    }
);

module.exports = {
    addDataClientMutation
};
