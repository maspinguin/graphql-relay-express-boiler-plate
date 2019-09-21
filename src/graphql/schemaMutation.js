import { GraphQLObjectType } from 'graphql';
import { addDataSenjaMutation } from './mutation/senjaMutation';

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields:{
        addDataSenjaMutation
    }
})
export default mutation;
