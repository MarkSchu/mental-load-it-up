import { ObservableVar } from 'utils/observable.js';
import { pathname } from 'data/pathname.js';
import general from 'data/general.js';
import { alerts } from 'data/alerts.js';

const auth = new GoTrue({
  APIUrl: 'https://spontaneous-nougat-f22d85.netlify.app/.netlify/identity',
  setCookie: true
});

export const user = new ObservableVar();

netlifyIdentity.on('init', userData => {
    user.set(userData);
});

user.current = () => {
    return auth.currentUser();
}

user.signup = (email, password) => {
    alerts.creating();
    return auth.signup(email, password)
    .then(() => 
        auth.login(email, password, true)
    )
    .then(() => {
        user.set(auth.currentUser());
        pathname.redirect('/dash');
        alerts.close()
    })
    .catch((err) => {
        alerts.error(err?.json?.msg || 'Something went wrong.');
    });
}

user.login = (email, password) => {
    alerts.loading();
    return auth.login(email, password, true)
    .then(() => {
        user.set(auth.currentUser());
        pathname.redirect('/dash');
        alerts.close()
    })
    .catch((err) => {
        alerts.error(err?.json['error_description'] || 'Something went wrong.');
    });
}

user.logout = () => {
    alerts.loading();
    auth.currentUser().logout()
    .then(() => {
        user.set(undefined);
        pathname.redirect('/login');
        alerts.close();
    })
    .catch((err) => {
        alerts.error(err?.json['error_description'] || 'Something went wrong.');
    })
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
