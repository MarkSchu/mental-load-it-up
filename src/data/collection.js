import { ObservableArray } from 'utils/observable.js';
import { api } from 'data/api.js';
import { state } from 'data/state.js';
import { user } from 'data/user.js';

export class Collection extends ObservableArray {

    constructor(collectionName) {
        super(collectionName);
        this.value = [];
        this.collectionName = collectionName;
    }

    create (instance) {
        const action = 'create';
        const collectionName = this.collectionName;
        const data = instance;
        instance.userId = user.id();
        return api(action, collectionName, data).then((res) => {
            const { status, body } = res; 
            if (status < 300) {
                state[collectionName].push(body.instance);
            }
            return res; 
        });
    }
    
    updateById (_id, properties) {
        const action = 'updateById'
        const collectionName = this.collectionName;
        const data = {_id, properties}
        return api(action, collectionName, data).then((res) => {
            const { status, body } = res; 
            if (status < 300) {
                state[collectionName].replace(body.instance);
            }
            return res;
        });
    }
    
    deleteById (_id) {
        const action = 'deleteById';
        const collectionName = this.collectionName;
        const data = {_id};
        return api(action, collectionName, data).then((res) => {
            const { status, body } = res; 
            if (status < 300) {
                state[collectionName].remove(_id);
            }
            return res;
        });
    }
}

