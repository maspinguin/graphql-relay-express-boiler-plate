import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';

import {
    mutationWithClientMutationId
} from 'graphql-relay';

import {
    senjaType
} from "../viewer/SenjaType";

import originalData from '../../mock/senja';
import {addData, findById} from '../../helper/lodashSearch';
import {addNodeDefinition} from "../viewer/GraphQLNodeDef";

const addDataSenjaMutation = mutationWithClientMutationId({
    name: 'addDataSenjaMutation',
    inputFields: {
        name: {
            type: GraphQLNonNull(GraphQLString)
        }
    },
    outputFields: {
        viewer: {
            type: senjaType
        }
    },
    mutateAndGetPayload: args => {
        const data = addData(originalData, { ...args });
        return {
            viewer: data
        }
    }
});

addNodeDefinition(
    {
        Senja: id => {
            return findById(id)
        },
    },
    {
        Senja: senjaType,
    }
);

module.exports = {
    addDataSenjaMutation
};
