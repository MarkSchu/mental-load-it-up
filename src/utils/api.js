import local from 'data/local.js';
import { TASKS, EVENTS, DOMAINS } from 'data/collection-names.js';

const api = {};

api.create = (collectionName, instance) => {
    return new Promise((resolve) => {
        resolve({
            instance: local.create(collectionName, instance),
            status: 200
        });
    });
}

api.getById = (collectionName, id) => {
    return new Promise((resolve) => {
        resolve({
            instance: local.getById(collectionName, id),
            status: 200
        });
    });
}

api.getAll = (collectionName) => {
    return new Promise((resolve) => {
        resolve({
            instance: local.getAll(collectionName),
            status: 200
        });
    });
}

api.getAllUserData = () => {
    return new Promise((resolve) => {
        resolve({
            userdata: {
                tasks: local.getAll(TASKS),
                events: local.getAll(EVENTS),
                domains: local.getAll(DOMAINS)
            },
            status: 200
        })
    });
}

api.updateById = (collectionName, id, properties) => {
    return new Promise((resolve) => {
        resolve({
            collection: local.updateById(collectionName, id, properties),
            status: 200
        });
    });
}

api.deleteById = (collectionName, id) => {
    return new Promise((resolve) => {
        resolve({
            collection: local.deleteById(collectionName, id),
            status: 200
        });
    });
}

export default api;


