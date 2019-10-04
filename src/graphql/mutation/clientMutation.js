import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';

import {
    mutationWithClientMutationId
} from 'graphql-relay';

import {
    clientType,
    client
} from "../viewer/ClientType";

import originalData from '../../mock/client';
import {addData, findById, updateData } from '../../helper/lodashSearch';
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

const updateDataClientMutation = mutationWithClientMutationId({
    name: 'updateDataClientMutation',
    inputFields: {
        plainId: {
            type: GraphQLNonNull(GraphQLString)
        },
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
        const data = updateData(originalData, { ...args });
        pubsub.publish('clientUpdated', {viewer: data});
        return {
            viewer: data
        };
    }
})

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
    addDataClientMutation,
    updateDataClientMutation
};
