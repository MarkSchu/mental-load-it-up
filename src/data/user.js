import { ObservableVar } from 'utils/observable.js';
import { pathname } from 'data/pathname.js';
import state from 'data/state.js';

const auth = new GoTrue({
  APIUrl: 'https://spontaneous-nougat-f22d85.netlify.app/.netlify/identity',
  setCookie: true
});

export const user = new ObservableVar();

netlifyIdentity.on('init', userData => {
    console.log('init')
    user.set(userData);
});

user.current = () => {
    return auth.currentUser();
}

user.signup = (email, password) => {
    state.loading.true();
    return auth.signup(email, password)
    .then(() => {
        return auth.login(email, password, true)
    })
    .then(() => {
        user.set(auth.currentUser());
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

user.logout = () => {
    state.loading.true();
    auth.currentUser().logout()
    .catch((err) => {
        alert(err)
    })
    .then(() => {
        user.set(undefined);
        state.loading.false();
    });
}

user.isLoggedIn = () => {
    return !!auth.currentUser();
}

user.email = () => {
    return auth.currentUser()?.email;
}

user.id = () => {
    return auth.currentUser()?.id;
}
