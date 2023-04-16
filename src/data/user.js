import { ObservableVar } from 'utils/observable.js';

export const user = new ObservableVar();

netlifyIdentity.init(userData => {
    user.set(userData);
})

export const redirect = (newPathname) => {
    history.pushState({}, '',  newPathname);
    const navEvent = new CustomEvent('navigate');
    window.dispatchEvent(navEvent);
}
