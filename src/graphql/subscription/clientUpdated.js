import { subscriptionWithClientId } from 'graphql-relay-subscription';
import {clientType, clients, client} from '../viewer/ClientType';
import {pubsub} from "../schemaSubscription";
import {withFilter} from "graphql-subscriptions";
import {GraphQLString} from 'graphql';

const clientUpdated = subscriptionWithClientId({
    name: 'clientUpdated',
    inputFields: {
        plainId: { type: GraphQLString }
    },
    outputFields: {
        viewer: {
            type: clientType
        }
    },
    // subscribe: (args) => {
    //     console.log('args', args);
    //     return pubsub.asyncIterator('clientUpdated');
    // }
    subscribe: (args) => pubsub.asyncIterator(`clientUpdated:${args.plainId}`)
        // withFilter(
        // () => pubsub.asyncIterator('clientUpdated'),
        // (payload, variables) => {
        //     console.log('payload', payload);
        //     console.log('var', variables);
        //     return payload.plainId == variables.plainId
        // }
    // )
        // () => pubsub.asyncIterator('clientUpdated')
});

module.exports = {
    clientUpdated
};
