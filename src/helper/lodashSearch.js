import _ from 'lodash';
var fs = require('fs');

const findById = (originalData, id) => {
    console.log('datass',originalData);
    return _.find(originalData, function (obj) {
        obj.plainId = id;
        return obj.id === id
    })
};

const search = (originalData,params) => {
    const data =  _.filter(originalData, function (obj) {
        obj.plainId = obj.id;
        return _.includes([params.toLowerCase()], obj.name.toLowerCase() );
    });
    return data;
};

const mapData = (originalData) => {
    return _.map(originalData, function (obj) {
        obj.plainId = obj.id;
        return obj;
    })
};

const addData = (originalData, payload = {}) => {
    const data = _.orderBy(originalData, ['id'], ['asc']);

    let id = data[data.length -1].id;
    id++;
    const newData = {
        id: id.toString(),
        plainId: id.toString(),
        ...payload
    };

    originalData.push(newData);
    return newData;
};

export  {
    addData,
    mapData,
    findById,
    search
}
