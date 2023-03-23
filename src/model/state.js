

const state = {
    tasks: new ObservableArray([]),
    events: new ObservableArray([]),
    domains: new ObservableArray([])
};

state.create = (model, data) => {
    api.create(model, data).then((instance) => {
        state[model].push(instance);
    });
}

state.update = (model, data) => {
    api.create(model, data).then((instance) => {
        state[model].push(instance);
    });
}

state.delete = (model, data) => {
    api.create(model, data).then((instance) => {
        state[model].push(instance);
    });
}

state.create('task', {
    
})

export default state

