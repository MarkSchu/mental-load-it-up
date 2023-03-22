const local = {};

function generateId() {
    return Math.floor(Math.random() * 10000000);
}

function getCollection(model) {
    const collection = localStorage.getItem(model);
    if (!collection) {
        throw `No Such Collection: ${model}`;
    }
    return JSON.parse(collection);
}

function saveCollection(model, collection) {
    localStorage.setItem(model, JSON.stringify(collection));
}

local.create = function(model, instance) {
    instance.id = generateId();
    instance.createdOn = (new Date()).toUTCString();
    instance.createdBy = 'Mark';
    const collection = getCollection(model);
    collection.push(instance);
    saveCollection(model, collection);
    return instance;
}

local.get = function (model, query) {

}

local.getById = function (model, id) {
    
}

local.getCollection = getCollection;

local.updateById = function(model) {

}

window.logDB = function() {
    console.log('Tasks', getCollection('Tasks'));
    console.log('Events', getCollection('Events'));
    console.log('Domains', getCollection('Domains'));
}

window.resetDB = function() {
    localStorage.setItem('Tasks', JSON.stringify([]));
    localStorage.setItem('Events', JSON.stringify([]));
    localStorage.setItem('Domains', JSON.stringify([]));
}



export default local;