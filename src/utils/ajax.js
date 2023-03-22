// const response = await fetch('URL', {
//     method: 'METHOD',
//     body,
//     headers
// });

// Where's the model go? In a REST api the model would go in the URL. 
// In a graphql api, the model would go in the body of the request. 
// I'm putting it on the reuest object - which is technically bad practice -
// for simplicity. 


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

api.create = function(model, instance, handlers) {
    ajax({
        method: 'POST', 
        body: instance,
        model
    }, handlers);
}

api.get = function(model, query, handlers) {
    ajax({
        method: 'GET', 
        body: query,
        model
    }, handlers);
}

api.update = function(model, query, handlers) {
    ajax({
        method: 'UPDATE', 
        body: query,
        model
    }, handlers);
}