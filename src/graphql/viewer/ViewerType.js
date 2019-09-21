import {
    globalIdField
} from 'graphql-relay';

import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

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
        string: {
            type: GraphQLString,
        },
        accountId: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
            resolve: _ => {
                return _.email;
            }
        }
    }
});


export {
    viewerType
}
