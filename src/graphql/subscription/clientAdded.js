import { subscriptionWithClientId } from 'graphql-relay-subscription';
import {clientType, clients, client, toConnection} from '../viewer/ClientType';
import {pubsub} from "../schemaSubscription";
import {GraphQLInt} from "graphql";
import {defaultConnectionArgs} from "../viewer/GraphQLNodeDef";
import {mapData, search} from "../../helper/lodashSearch";
import originalData from "../../mock/client";
import {withFilter} from 'graphql-subscriptions';

const clientAdded = subscriptionWithClientId({
    name: 'clientAdded',
    inputFields: {
        ...defaultConnectionArgs
    },
    outputFields: {
        clients
    },
    subscribe:
        () => pubsub.asyncIterator('clientAdded'),
         // withFilter(
         //     () => pubsub.asyncIterator('clientAdded'),
         //     (payload, variable) => {
         //         console.log('payload', payload.clients.args.first);
         //         console.log('variable', variable);
         //         return true;
         //     })


});

module.exports = {
    clientAdded
};
