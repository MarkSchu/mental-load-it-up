import { ObservableVar } from 'utils/observable.js';
import state from 'data/state.js';

export const pathname = new ObservableVar(window.location.pathname);

window.addEventListener('popstate', () => {
    pathname.set(window.location.pathname);
});

window.addEventListener('redirect', (e) => {
    pathname.set(window.location.pathname);
});

window.addEventListener('load', () => {
    pathname.set(window.location.pathname);
});

pathname.redirect = (newPathname) => {
    history.pushState({}, '',  newPathname);
    const navEvent = new CustomEvent('redirect');
    window.dispatchEvent(navEvent);
}