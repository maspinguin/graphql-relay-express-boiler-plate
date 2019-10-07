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
    client,
    clients
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
        },
        status: {
            type: GraphQLNonNull(GraphQLString)
        }
    },
    outputFields: {
        viewer: {
            type: clientType
        }
    },
    mutateAndGetPayload: (args, context, info) => {
        const data = addData(originalData, { ...args });
        // pubsub.publish('clientAdded');
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
        },
        status: {
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
        if(data) {
            pubsub.publish(`clientUpdated:${args.plainId}`, {viewer: data});
            return {
                viewer: data
            };
        }
        return null;

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
