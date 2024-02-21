import { ObservableArray } from 'utils/observable.js';
import { api } from 'utils/api.js';
import { alerts } from 'state/alerts.js';
import { sortByDates } from 'utils/dates.js';


export class Collection extends ObservableArray {

    constructor(collection) {
        super(collection);
        this.value = [];
        this.collection = collection;
    }

    create(data) {
        alerts.creating();
        const collection = this.collection;
        return api('create', collection, data).then((response) => {
            if (response.status < 300) {
                collections[collection].addAndSort(response.body);
                alerts.close();
            } else {
                alerts.error(response.statusText);
            }
        });
    }
    
    update(_id, changes) {
        alerts.saving();
        const collection = this.collection;
        const data = {_id, changes };
        return api('updateById', collection, data).then((response) => {
            if (response.status < 300) {
                collections[collection].replaceAndSort(response.body);
                alerts.close();
            } else {
                alerts.error(response.statusText);
            }
        });
    }
    
    delete (_id) {
        alerts.deleting();
        const collection = this.collection;
        const data = {_id};
        return api('deleteById', collection, data).then((response) => {
            if (response.status < 300) {
                collections[collection].remove(_id);
                alerts.close();
            } else {
                alerts.error(response.statusText);
            }
        });
    }

    remove(_id) {
        const index = this.value.findIndex(item => item._id === _id);
        if (index !== -1) {
            this.value.splice(index, 1);
            this.emit();
        }
    }

    replace(newItem) {
        const index = this.value.findIndex(item => item._id === newItem._id);
        if (index !== -1) {
            this.value[index] = newItem;
            this.emit();
        }
    }

    replaceAndSort(newItem) {
        const index = this.value.findIndex(item => item._id === newItem._id);
        if (index !== -1) {
            this.value[index] = newItem;
            this.value = sortByDates(this.value);
            this.emit();
        }
    }

    addAndSort(item) {
        this.value.push(item);
        this.value = sortByDates(this.value);
        this.emit();
    }

    findById(_id) {
        return this.value.find(domain => domain._id === _id);
    }
}

export const collections = {
    tasks: new Collection('tasks'),
    events: new Collection('events'),
    domains: new Collection('domains')
}