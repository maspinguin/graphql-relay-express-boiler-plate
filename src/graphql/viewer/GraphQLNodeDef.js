import { fromGlobalId, nodeDefinitions, globalIdField } from 'graphql-relay';
import { GraphQLString } from 'graphql';
import {anotherDefaultConnectionArgs} from './TypeUtil';

let mappingInterface = {};
let mappingField = {};

let { nodeInterface, nodeField } = nodeDefinitions(
    globalId => {
        let { type, id } = fromGlobalId(globalId);
        // console.log('node from globalId', globalId, type, id);
        // console.log(mappingInterface[type](id));
        return mappingInterface[type](id);
    },
    obj => {
        // console.log('node from obj', obj, obj.__proto__.constructor.name);
        return mappingField[obj.__proto__.constructor.name];
    }
);

/**
 Sample addNodeDefinition

 addNodeDefinition({
  Account: id => Wallex.accountService.findOne(id),
 }, {
  Account: accountType,
 });

 Sample addSimpleNodeDefinition (NOTE: bind the _findOneFunction)

 addSimpleNodeDefinition(accountType, ::Wallex.accountService.findOne);

 */

module.exports = {
    defaultTypeFields: (typeName) => {
        return {
            id: globalIdField(typeName),
            plainId: {
                type: GraphQLString,
                resolve: _ => {
                    return _.id;
                },
            }
        }
    },
    addNodeDefinition: (_interface, _field) => {
        mappingInterface = Object.assign(mappingInterface, _interface);
        mappingField = Object.assign(mappingField, _field);
    },
    addSimpleNodeDefinition: (_type, _findOneFunction) => {
        let typeName = _type.name;

        let _interface = {};
        _interface[typeName] = id => _findOneFunction(id);

        let _field = {};
        _field[typeName] = _type;

        mappingInterface = Object.assign(mappingInterface, _interface);
        mappingField = Object.assign(mappingField, _field);
    },
    nodeInterface: nodeInterface,
    nodeField: nodeField,
    defaultConnectionArgs: {
        ...anotherDefaultConnectionArgs
    }
};
