import { GraphQLObjectType } from 'graphql';
import { addDataSenjaMutation } from './mutation/senjaMutation';
import { addDataClientMutation } from './mutation/clientMutation';

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields:{
        addDataSenjaMutation,
        addDataClientMutation
    }
});
export default mutation;
