import { ObservableBool } from 'utils/observable.js';
import { TASKS, EVENTS, DOMAINS, TEAMS } from 'data/collection-names.js';
import { pathname } from 'data/pathname.js';
import { user } from 'data/user.js';
import { Collection } from 'data/collection.js';
import { ajax } from 'data/api.js';

export const state = {
    user,
    loading: new ObservableBool(false),
    teams: new Collection(TEAMS),
    tasks: new Collection(TASKS),
    events: new Collection(EVENTS),
    domains: new Collection(DOMAINS)
};

state.init = () => {
    state.loading.true();
    if (user.isLoggedIn()) {
        state.getAllUserData().then(() => state.loading.false());
    } else {
        pathname.redirect('/login');
        state.loading.false();
    }
}

state.getAllUserData = () => {
    const teamId = user.teamId();
    return ajax('getAllUserData', {teamId}).then((res) => {
        const { status, body } = res; 
        if (status < 300) {
            state[TASKS].set(body.userdata.tasks);
            state[EVENTS].set(body.userdata.events);
            state[DOMAINS].set(body.userdata.domains);
        }
        return res;
    });
}

export default state;