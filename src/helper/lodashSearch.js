import _ from 'lodash';

const findById = (originalData, id) => {
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

export  {
    findById,
    search
}
