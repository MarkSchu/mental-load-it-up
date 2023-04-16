import { ObservableArray, ObservableBool, ObservableVar } from 'utils/observable.js';
import api from 'data/api.js';
import { TASKS, EVENTS, DOMAINS } from 'data/collection-names.js';

const state = {
    tasks: new ObservableArray([]),
    events: new ObservableArray([]),
    domains: new ObservableArray([])
};

state.create = (collectionName, instance) => {
    return api.create(collectionName, instance).then((res) => {
        const { status, body } = res; 
        if (status < 300) {
            state[collectionName].push(body.instance);
        }
        return res; 
    });
}

state.updateById = (collectionName, id, properties) => {
    return api.updateById(collectionName, id, properties).then((res) => {
        const { status, body } = res; 
        if (status < 300) {
            state[collectionName].set(body.collection);
        }
        return res;
    });
}

state.deleteById = (collectionName, id) => {
    return api.deleteById(collectionName, id).then((res) => {
        const { status, body } = res; 
        if (status < 300) {
            state[collectionName].set(body.collection);
        }
        return res;
    });
}

state.getAllUserData = () => {
    return api.getAllUserData().then((res) => {
        const { status, body } = res; 
        if (status < 300) {
            state[TASKS].set(body.userdata.tasks);
            state[EVENTS].set(body.userdata.events);
            state[DOMAINS].set(body.userdata.domains);
        }
        return res;
    });
}




export default state


