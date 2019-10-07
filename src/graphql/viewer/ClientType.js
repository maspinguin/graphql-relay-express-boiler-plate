import {
    globalIdField,
    connectionDefinitions,
    connectionFromArraySlice
} from 'graphql-relay';

import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import {
    defaultConnectionArgs,
    addNodeDefinition
} from './GraphQLNodeDef';

import {
    mapData,
    findById,
    search
} from "../../helper/lodashSearch";

import originalData from '../../mock/client';

// imagine that is the data from DB.. (bcs this repo not implement DB) u can use sequilize for db implementation for example

let clientType = new GraphQLObjectType({
    name: 'Client',
    fields: {
        id: globalIdField('Client'),
        plainId: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        userId: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        }
    }
});

addNodeDefinition({
    Client: id => {
        return findById(originalData, id)
    }
}, {
    Client: clientType
});

let {
    connectionType: clientConnection,
    edgeType: clientEdge,
} = connectionDefinitions({
    name: 'Client',
    nodeType: clientType
});

let clients = {
    type: clientConnection,
    args: {
        ...defaultConnectionArgs
    },
    resolve: async(_, args, context) => {
        console.log('args test', args);
        // imagine it was all data
        let result  = mapData(originalData);

        if(args.search) {
            //imagine this will implement search from db
            result = search(originalData, args.search);
        }

        let data = {
            content: result,
            offset: 0,
            total: result.length
        };
        return toConnection(data, args);

    }
};


let client = {
    type: clientType,
    args: {
        id: {
            type: GraphQLString
        }
    },
    resolve: async (_, { id }, context) => {
        const _data = mapData(originalData);
        const data = findById(_data, id);
        console.log('data', data);
        if(data) {
            return data;
        }
        return null;

    }
};

const toConnection = (pageResult, connectionArgs) => {
    let meta = {
        sliceStart: pageResult.offset,
        arrayLength: pageResult.total,
    };
    console.log('toConnection', pageResult, meta, connectionArgs);
    let {content} = pageResult;
    return connectionFromArraySlice(content, connectionArgs, meta);
};


export {
    clientConnection,
    toConnection,
    clientType,
    clients,
    client
}
