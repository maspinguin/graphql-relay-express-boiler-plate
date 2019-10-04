import { subscriptionWithClientId } from 'graphql-relay-subscription';
import {clientType, clients, client} from '../viewer/ClientType';
import {pubsub} from "../schemaSubscription";

const clientUpdated = subscriptionWithClientId({
    name: 'clientUpdated',
    // inputFields: {
    //     // id: { type: GraphQLString }
    // },
    outputFields: {
        viewer: {
            type: clientType
        }
    },
    subscribe: () => pubsub.asyncIterator('clientUpdated')
});

module.exports = {
    clientUpdated
};
