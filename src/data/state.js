import { ObservableArray } from 'utils/observable.js';
import api from 'utils/api.js';
import { TASKS, EVENTS, DOMAINS } from 'data/collection-names.js';

const state = {
    tasks: new ObservableArray([]),
    events: new ObservableArray([]),
    domains: new ObservableArray([])
};

state.create = (collectionName, instance) => {
    return api.create(collectionName, instance).then((res) => {
        if (res.status < 300) {
            state[collectionName].push(res.instance);
        }
        return res; 
    });
}

state.updateById = (collectionName, id, properties) => {
    return api.updateById(collectionName, id, properties).then((res) => {
        if (res.status < 300) {
            state[collectionName].set(res.collection);
        }
        return res;
    });
}

state.getAllUserData = () => {
    return api.getAllUserData().then((res) => {
        if (res.status < 300) {
            state[TASKS].set(res.userdata.tasks);
            state[EVENTS].set(res.userdata.events);
            state[DOMAINS].set(res.userdata.domains);
        }
        return res;
    });
}

export default state


