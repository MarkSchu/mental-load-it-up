import { ObservableVar } from 'utils/observable.js';
import { pathname } from 'data/pathname.js';
import state from 'data/state.js';

export const user = new ObservableVar();

const auth = new GoTrue({
  APIUrl: 'https://spontaneous-nougat-f22d85.netlify.app/.netlify/identity',
  setCookie: false,
});

user.signup = (email, password) => {
    return auth.signup(email, password)
    .then(() => {
        return auth.login(email, password)
    })
    .then(() => {
        return state.teams.create({userIds: [auth.currentUser().id]});
    })
    .then((response) => {
        return auth.currentUser().update({ data: { teamId: response.body.instance._id } });        
    })
    .then(() => {
        pathname.redirect('/');
    });
}

user.login = (email, password) => {
    return auth.login(email, password)
    .then(() => {
        pathname.redirect('/')
    })
}

user.isLoggedIn = () => {
    return !!auth.currentUser();
}
