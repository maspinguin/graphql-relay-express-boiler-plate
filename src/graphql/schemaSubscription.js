import { GraphQLObjectType } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { clientAdded } from './subscription/clientAdded';

const pubsub = new PubSub();

const subscription = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        clientAdded
    }


});
export {
    pubsub,
    subscription
};
