import {
    globalIdField
} from 'graphql-relay';

import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import { senjas, senja } from './SenjaType';
import { clients, client } from './ClientType';

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
        senja,
        senjas,
        client,
        clients
    }
});


export {
    viewerType
}
