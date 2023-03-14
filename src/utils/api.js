const api = {};

// const response = await fetch('URL', {
//     method: 'METHOD',
//     body,
//     headers
// });

// Where's the model go? In a REST api the model would go in the URL. 
// In a graphql api, the model would go in the body of the request. 
// I'm putting it on the reuest object - which is technically bad practice -
// for simplicity. 

api.create = function(model, instance, handlers) {
    setTimeout(() => {
        const savedInstance = createModel(model, instance);
        handlers.success(savedInstance);
        handlers.done();
    }, 1000);
    // ajax({
    //     method: 'POST', 
    //     body: instance,
    //     model
    // }, handlers);
}

api.get = function(model, query, handlers) {
    // ajax({
    //     method: 'GET', 
    //     body: query,
    //     model
    // }, handlers);
}

api.update = function(model, query, handlers) {
    // ajax({
    //     method: 'UPDATE', 
    //     body: query,
    //     model
    // }, handlers);
}

api.getUserData = function(handlers) {
    setTimeout(() => {
        handlers.success({
            tasks: getCollection('Tasks'),
            event: getCollection('Events'),
            domains: getCollection('Domains'),
        })
    }, 1000);
}

async function ajax(request, handlers) {

    var body;
    
    if (request.method === 'POST') {
        
    }

    if (request.method === 'GET') {
        body;
    }

    if (request.method === 'UPDATE') {
        body;
    }

    return new Promise(() => {

        const response = {
            status: 200,
            statusText: 'Success',
            json: async () => body
        }
        
        if (response.status >= 300) {
            if (handlers.failure) {
                handlers.failure(response.status, response.statusText, response);
            }
        }

        else {
            const data = response.json();
            if (handlers.success) {
                handlers.success(data, response);
            }
        }

        if (handlers.done) {
            handlers.done();
        }

        return response;
    });
}

function generateId() {
    return Math.floor(Math.random() * 100000);
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

function createModel(model, instance) {
    const collection = getCollection(model);
    instance.id = generateId();
    collection.push(instance);
    saveCollection(model, collection);
    return instance;
}

function updateModel(model, query) {

}

function getModel(model, query) {

}

function resetDB () {
    const confirmed = confirm('This will delete all your data. Are you sure?');
    if (confirmed) {
        localStorage.setItem('Tasks', JSON.stringify([]));
        localStorage.setItem('Events', JSON.stringify([]));
        localStorage.setItem('Domains', JSON.stringify([]));
    }
}

function logDB () {
    console.log(localStorage.setItem('Tasks'));
    console.log(localStorage.setItem('Events'));
    console.log(localStorage.setItem('Domains'));
}

export default api;