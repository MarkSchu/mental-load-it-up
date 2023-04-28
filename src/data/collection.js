import { ObservableArray } from 'utils/observable.js';
import api from 'data/api.js';
import state from 'data/state.js';

export class Collection extends ObservableArray {

    constructor(collectionName) {
        super(collectionName);
        this.value = [];
        this.collectionName = collectionName;
    }

    create (instance) {
        const {collectionName} = this;
        return api.create(collectionName, instance).then((res) => {
            const { status, body } = res; 
            if (status < 300) {
                state[collectionName].push(body.instance);
            }
            return res; 
        });
    }
    
    updateById (id, properties) {
        const {collectionName} = this;
        return api.updateById(collectionName, id, properties).then((res) => {
            const { status, body } = res; 
            if (status < 300) {
                state[collectionName].set(body.collection);
            }
            return res;
        });
    }
    
    deleteById (id) {
        const {collectionName} = this;
        return api.deleteById(collectionName, id).then((res) => {
            const { status, body } = res; 
            if (status < 300) {
                state[collectionName].set(body.collection);
            }
            return res;
        });
    }
}

