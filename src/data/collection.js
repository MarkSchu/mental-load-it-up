import { ObservableArray } from 'utils/observable.js';
import { api } from 'data/api.js';
import { alerts } from 'data/alerts.js';
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
                alerts.close();
                collections[collection].addAndSort(response.body);
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
                alerts.close();
                collections[collection].replaceAndSort(response.body);
            } else {
                alerts.error(response.statusText);
            }
        });
    }
    
    delete (_id) {
        const collection = this.collection;
        const data = {_id};
        return api('deleteById', collection, data).then((response) => {
            if (response.status < 300) {
                collections[collection].remove(_id);
            }
            return response;
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

    insertByDate(newitem) {  
        // sort from newest to oldest creation date
        // then sort from newest to oldest due date
        // this.value
        // item.creationDate
    }
}

export const collections = {
    tasks: new Collection('tasks'),
    events: new Collection('events'),
    domains: new Collection('domains')
}