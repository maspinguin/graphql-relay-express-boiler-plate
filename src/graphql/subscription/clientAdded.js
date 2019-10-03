import { subscriptionWithClientId } from 'graphql-relay-subscription';
import {clientType, clients} from '../viewer/ClientType';
import {pubsub} from "../schemaSubscription";

const clientAdded = subscriptionWithClientId({
    name: 'clientAdded',
    // inputFields: {
    //     // id: { type: GraphQLString }
    // },
    outputFields: {
       clients
    },
    subscribe: () => pubsub.asyncIterator('clientAdded')
});

module.exports = {
    clientAdded
};
