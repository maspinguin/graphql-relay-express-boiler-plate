import { GraphQLObjectType } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { clientAdded } from './subscription/clientAdded';
import { clientUpdated } from './subscription/clientUpdated';

const pubsub = new PubSub();

const subscription = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        clientAdded,
        clientUpdated
    }


});
export {
    pubsub,
    subscription
};
