import { user } from 'data/user.js';

const api = {};

const ajax = (action, collectionName, data) => {
    return fetch('/.netlify/functions/request', {
        method: 'POST',
        body: JSON.stringify({
            action,
            collectionName,
            data
        })
    }).then((res) => {
        return res.json().then((body) => {
            return {body, status: res.status}
        })
    })
    .catch((res) => {
       alert(res);
       return res;
    });
}

api.create = (collectionName, instance) => {
    return ajax('create', collectionName, instance);
}

api.getById = (collectionName, id) => {
    return ajax('getById', collectionName, {id});
}

api.getAll = (collectionName) => {
    return ajax('getAll', collectionName);
}

api.getAllUserData = () => {
    const teamId = user.teamId();
    return ajax('getAllUserData', {teamId});
}

api.updateById = (collectionName, id, properties) => {
    return ajax('updateById', collectionName, {id, properties});
}

api.deleteById = (collectionName, id) => {
    return ajax('deleteById', collectionName, {id})
}

export default api;


