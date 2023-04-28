import { ObservableBool } from 'utils/observable.js';
import api from 'data/api.js';
import { TASKS, EVENTS, DOMAINS, TEAMS } from 'data/collection-names.js';
import { pathname } from 'data/pathname.js';
import { user } from 'data/user.js';
import { Collection } from 'data/collection.js';

export const state = {
    user,
    isInitApp: new ObservableBool(false),
    isRequesting: new ObservableBool(false),
    teams: new Collection(TEAMS),
    tasks: new Collection(TASKS),
    events: new Collection(EVENTS),
    domains: new Collection(DOMAINS)
};

state.initApp = () => {
    state.isInitApp.true();
    if (user.isLoggedIn()) {
        state.getAllUserData().then(() => {
            state.isInitApp.false();
        });
    } else {
        pathname.redirect('/auth');
        state.isInitApp.false();
    }
}

state.getAllUserData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 3000);
    })
    // return api.getAllUserData().then((res) => {
    //     const { status, body } = res; 
    //     if (status < 300) {
    //         state[TASKS].set(body.userdata.tasks);
    //         state[EVENTS].set(body.userdata.events);
    //         state[DOMAINS].set(body.userdata.domains);
    //     }
    //     return res;
    // });
}

export default state;