import local from 'data/local.js';
import { TASKS, EVENTS, DOMAINS } from 'data/collection-names.js';

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
    });
}

api.create = (collectionName, instance) => {
    instance.userId = netlifyIdentity.currentUser().id;
    return ajax('create', collectionName, instance);
}

api.getById = (collectionName, id) => {
    return ajax('getById', collectionName, {id});
}

api.getAll = (collectionName) => {
    return ajax('getAll', collectionName);
}

api.getAllUserData = () => {
    const userId = netlifyIdentity.currentUser().id;
    return ajax('getAllUserData', {userId});
}

api.updateById = (collectionName, id, properties) => {
    return ajax('updateById', collectionName, {id, properties});
}

api.deleteById = (collectionName, id) => {
    return ajax('deleteById', collectionName, {id})
}

export default api;


