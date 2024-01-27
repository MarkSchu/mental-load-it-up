import { ObservableArray } from 'utils/observable.js';
import { api } from 'data/api.js';
import { alerts } from 'data/alerts.js';


export const compareCreationDate = (a, b) => {
    const aDate = new Date(a.creationDate);
    const bDate = new Date(b.creationDate);
    if (aDate > bDate) {
        return 1;
    }
    if (aDate< bDate) {
        return -1;s
    }
    return 0;
}

export const compareDueDate = (a, b) => {
    const aDate = new Date(a.dueDate);
    const bDate = new Date(b.dueDate);
    if (aDate > bDate) {
        return 1;
    }
    if (aDate< bDate) {
        return -1;s
    }
    return 0;
}

export const sortByDates = (collection) => {
    const withoutDueDates = collection.filter((item) => !item.dueDate);
    const withDueDates = collection.filter((item) => !!item.dueDate);
    withoutDueDates.sort(compareCreationDate);
    withDueDates.sort(compareDueDate);
    const sorted =  withoutDueDates.concat(withDueDates);
    return sorted;
}

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
                // collections[collection].push(response.body);
                collections[collection].addAndSort(response.body);
                // collections[collection].inertByDate(response.body);
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