import {
    globalIdField,
    connectionDefinitions,
    connectionFromArraySlice
} from 'graphql-relay';

import {
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

import originalData from '../../mock/senja';

// imagine that is the data from DB.. (bcs this repo not implement DB) u can use sequilize for db implementation for example

let senjaType = new GraphQLObjectType({
    name: 'Senja',
    fields: {
        id: globalIdField('Senja'),
        plainId: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        }
    }
});

addNodeDefinition({
    Senja: id => {
        return findById(originalData, id)
    }
}, {
    Senja: senjaType
});

let {
    connectionType: senjaConnection,
    edgeType: senjaEdge,
} = connectionDefinitions({
    name: 'Senja',
    nodeType: senjaType
});

let senjas = {
    type: senjaConnection,
    args: {
        ...defaultConnectionArgs
    },
    resolve: async(_, args, context) => {
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


let senja = {
    type: senjaType,
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
    senjaType,
    senjas,
    senja
}
