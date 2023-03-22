import local from 'utils/local.js'

const api = {};

api.create = function(model, instance, handlers) {
    handlers.success(local.create(model, instance));
    handlers.done();
}

api.get = function(model, query, handlers) {
    handlers.success(local.get(model, query));
    handlers.done();
}

api.getBy = function(model, query, handlers) {
  
}

api.update = function(model, query, handlers) {
   
}

api.getUserData = function(handlers) {
    handlers.success({
        tasks: local.getCollection('Tasks'),
        events: local.getCollection('Events'),
        domains: local.getCollection('Domains')
    });
}

export default api;