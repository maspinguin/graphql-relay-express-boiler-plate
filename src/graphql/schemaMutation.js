import { GraphQLObjectType } from 'graphql';
import { addDataSenjaMutation } from './mutation/senjaMutation';
import { addDataClientMutation, updateDataClientMutation } from './mutation/clientMutation';

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields:{
        addDataSenjaMutation,
        addDataClientMutation,
        updateDataClientMutation
    }
});
export default mutation;
