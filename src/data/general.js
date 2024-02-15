import { pathname } from 'data/pathname.js';
import { user } from 'data/user.js';
import { api } from 'data/api.js';
import { collections } from 'data/collection.js';
import { sortByDates } from 'utils/dates.js';
import { alerts } from 'data/alerts.js';

export const general = new ObservableVar();

general.init = () => {
    if (user.isLoggedIn()) {
        general.getAllUserData();
    } else {
        pathname.redirect('/login');
    }
}

general.getAllUserData = () => {
    alerts.loading();
    return api('getAllUserData').then((response) => {
        const { status, body, statusText } = response; 
        if (status < 300) {
            collections.tasks.set(sortByDates(body.tasks));
            collections.events.set(body.events);
            collections.domains.set(body.domains);
            initLoad.done();
            alerts.close()
        } else {
            alerts.error(statusText);
        }
    });
}


export default general;