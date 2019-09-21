import {
    globalIdField
} from 'graphql-relay';

import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import { senjas, senja } from './SenjaType';

let viewerType = new GraphQLObjectType({
    name: 'Viewer',
    fields: {
        id: globalIdField('Viewer'),
        plainId: {
            type: GraphQLString,
            resolve: _ => {
                return _.id;
            },
        },
        senja, // sorry it's my girlfriend name :D
        senjas
    }
});


export {
    viewerType
}
