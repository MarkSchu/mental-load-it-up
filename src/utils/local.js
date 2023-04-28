import { TASKS, EVENTS, DOMAINS } from 'data/collection-names.js';

const local = {};

const generateId = () => {
    return Math.floor(Math.random() * 10000000);
}

const createdOn = () => {
    return (new Date()).toLocaleDateString();
}

const getCollection = (collectionName) => {
    const collection = localStorage.getItem(collectionName);
    if (!collection) {
        throw  `Collection "${collectionName}" does not exist`;
    }
    return JSON.parse(localStorage.getItem(collectionName));
}

const saveCollection = (collectionName, collection) => {
    localStorage.setItem(collectionName, JSON.stringify(collection));
}

local.create = (collectionName, instance) => {
    instance.id = generateId();
    instance.createdOn = createdOn();
    const collection = getCollection(collectionName);
    collection.push(instance);
    saveCollection(collectionName, collection);
    return instance;
}

local.getById = (collectionName, id) => {
    const collection = getCollection(collectionName);
    return collection.find((instance) => instance.id === id);
}

local.getAll = (collectionName) => {
    return getCollection(collectionName);
}

local.updateById = (collectionName, id, properties) => {
    const collection = getCollection(collectionName);
    const instance = collection.find((instance) => instance.id === id);
    for (const prop in properties) {
        instance[prop] = properties[prop];
    }
    saveCollection(collectionName, collection);
    return collection;
}

local.deleteById = (collectionName, id) => {
    const collection = getCollection(collectionName);
    const newCollection = collection.filter((instance) => instance.id !== id);
    saveCollection(collectionName, newCollection);
    return newCollection;
}

window.logDB = () => {
    console.log(TASKS, getCollection(TASKS));
    console.log(EVENTS, getCollection(EVENTS));
    console.log(DOMAINS, getCollection(DOMAINS));
}

window.resetDB = () => {
    localStorage.setItem(TASKS, JSON.stringify([]));
    localStorage.setItem(EVENTS, JSON.stringify([]));
    localStorage.setItem(DOMAINS, JSON.stringify([]));
}

export default local;


