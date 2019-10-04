import _ from 'lodash';
var fs = require('fs');

const findById = (originalData, id) => {
    //console.log('datass',originalData);
    return _.find(originalData, function (obj) {
        obj.plainId = Number(id);
        return Number(obj.id) === Number(id)
    })
};

const updateData = (originalData, payload = {}) => {
    let find = false;
    _.each(originalData, function (item) {
        if(Number(item.plainId) == Number(payload.plainId)) {
            find = true;
        }
    });
    if(find){
        _.each(originalData, function (item, index) {
            if(item.plainId === payload.plainId) {
                originalData[index].name = payload.name;
                originalData[index].email = payload.email;
            }
        });
        return payload;
    }

    return null;
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
    //console.log('id', id);
    id++;
    const newData = {
        id: id,
        plainId: id,
        ...payload
    };

    originalData.push(newData);
    return newData;
};

export  {
    addData,
    updateData,
    mapData,
    findById,
    search
}
