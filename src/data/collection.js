import { ObservableArray } from 'utils/observable.js';
import { api } from 'data/api.js';
import { alerts } from 'data/alerts.js';

export class Collection extends ObservableArray {

    constructor(collection) {
        super(collection);
        this.value = [];
        this.collection = collection;
    }

    create (data) {
        alerts.creating();
        const collection = this.collection;
        return api('create', collection, data).then((response) => {
            if (response.status < 300) {
                alerts.close();
                collections[collection].push(response.body);
            } else {
                alerts.error(response.statusText);
            }
        });
    }
    
    updateById (_id, properties) {
        const collection = this.collection;
        const data = {_id, properties}
        return api('updateById', collection, data).then((response) => {
            const { status, body } = response; 
            if (status < 300) {
                state[collection].replace(body.instance);
            }
            return response;
        });
    }
    
    deleteById (_id) {
        const collection = this.collection;
        const data = {_id};
        return api('deleteById', collection, data).then((response) => {
            const { status, body } = response; 
            if (status < 300) {
                state[collection].remove(_id);
            }
            return response;
        });
    }
}

export const TASKS = 'tasks';
export const EVENTS = 'events';
export const DOMAINS = 'domains';

export const collections = {
    tasks: new Collection(TASKS),
    events: new Collection(EVENTS),
    domains: new Collection(DOMAINS)
}