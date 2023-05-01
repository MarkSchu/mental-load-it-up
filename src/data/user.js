import { ObservableVar } from 'utils/observable.js';
import { pathname } from 'data/pathname.js';
import state from 'data/state.js';
// import 'gotrue-js';

export const user = new ObservableVar();

const auth = new GoTrue({
  APIUrl: 'https://spontaneous-nougat-f22d85.netlify.app/.netlify/identity',
  setCookie: true
});

user.signup = (email, password) => {
    state.loading.true();
    return auth.signup(email, password)
    .then(() => {
        return auth.login(email, password, true)
    })
    .then(() => {
        return state.teams.create({userIds: [auth.currentUser().id]});
    })
    .then((response) => {
        return auth.currentUser().update({ data: { teamId: response.body.instance._id } });        
    })
    .then(() => {
        pathname.redirect('/');
    })
    .catch((err) => {
        alert(err)
    })
    .finally(() => {
        state.loading.false();
    });
}

user.login = (email, password) => {
    state.loading.true();
    return auth.login(email, password, true)
    .then(() => {
        pathname.redirect('/')
    })
    .catch((err) => {
        alert(err)
    })
    .finally(() => {
        state.loading.false();
    });
}

user.isLoggedIn = () => {
    return !!auth.currentUser();
}

user.teamId = () => {
    return auth.currentUser().user_metadata.teamId;
}