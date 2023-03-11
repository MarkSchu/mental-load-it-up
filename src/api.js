import { userdata } from './data.js';

/* 

    localStorage.setItem('Domains', JSON.stringify([
        {name: 'travel'},
        {name: 'birthdays'}
    ]));
    localStorage.getItem('Domains');

*/

export function getUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                tasks: getCollection('Tasks'),
                events: getCollection('Events'),
                domains: getCollection('Domains'),
            });
        }, 1000);
    });
}

const getCollection = (model) => {
    const collection = localStorage.getItem(model);
    if (!collection) {
        throw `No Such Collection: ${model}`;
    }
    return JSON.parse(collection);
}

const saveCollection = (model, collection) => {
    localStorage.setItem(model, JSON.stringify(collection));
}

const handleResponse = (body, onSuccess, onFailure, onDone) => {
    const status = 200;
    setTimeout(() => {
        status < 300
        ? onSuccess(body)
        : onFailure(status);
        onDone();
    }, 1000)
}

export const api = {

    create(model, instance, onBefore, onSuccess, onFailure, onDone) {
        onBefore();
        const collection = getCollection(model);
        instance.id = Math.floor(Math.random() * 100000);
        collection.push(instance);
        saveCollection(model, collection);
        handleResponse(instance, onSuccess, onFailure, onDone);
    },

    get(model, query, onBefore, onSuccess, onFailure, onDone) {
        onBefore();
        const collection = getCollection(model);
        let body;
        if (query) {
            body = collection.find((instance => instance.id === query.id));
        }
        body = collection;
        handleResponse(body, onSuccess, onFailure, onDone);
    },

    update(model, query, updates, onBefore, onSuccess, onFailure, onDone) {
        onBefore();
        const collection = getCollection(model);;
        const instance = collection.find((instance => instance.id === query.id));
        for (key in updates) {
            instance[key] = updates[key];
        }
        saveCollection(model, collection);
        handleResponse(instance, onSuccess, onFailure, onDone);
    }
}

