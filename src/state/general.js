import { pathname } from 'state/pathname.js';
import { user } from 'state/user.js';
import { api } from 'utils/api.js';
import { collections } from 'state/collection.js';
import { sortByDates } from 'utils/dates.js';
import { alerts } from 'state/alerts.js';
import { ObservableVar, ObservableEvent } from 'utils/observable.js';

export const general = new ObservableVar();
export const initLoadComplete = new ObservableEvent();

general.init = () => {
    if (user.isLoggedIn()) {
        general.getAllUserData();
    } else {
        pathname.redirect('/login');
    }
}

const makeItem = (list) => {
    list.forEach((item) => {
        item.type = 'items';
    })
}

const makeTask = (list) => {
    list.forEach((item) => {
        item.type = 'tasks';
    })
}

const makeEvent = (list) => {
    list.forEach((item) => {
        item.type = 'events';
    })
}

const makeDomain = (list) => {
    list.forEach((item) => {
        item.type = 'domains';
    })
}

general.getAllUserData = () => {
    alerts.loading();
    return api('getAllUserData').then((response) => {
        const { status, body, statusText } = response; 
        if (status < 300) {
            makeItem(body.items);
            makeTask(body.tasks);
            makeEvent(body.events);
            makeDomain(body.domains);
            collections.items.set(sortByDates(body.items));
            collections.tasks.set(sortByDates(body.tasks));
            collections.events.set(sortByDates(body.events));
            collections.any.set(body.items.concat(body.tasks).concat(body.events))
            collections.domains.set(body.domains);
            initLoadComplete.emit();
            alerts.close()
        } else {
            alerts.error(statusText);
        }
    });
}


export default general;