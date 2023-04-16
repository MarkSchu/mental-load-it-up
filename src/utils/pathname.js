import { ObservableVar } from 'utils/observable.js';

export const pathname = new ObservableVar(window.location.pathname);

window.addEventListener('popstate', () => {
    pathname.set(window.location.pathname);
});

window.addEventListener('navigate', () => {
    pathname.set(window.location.pathname);
});

export const redirect = (newPathname) => {
    history.pushState({}, '',  newPathname);
    const navEvent = new CustomEvent('navigate');
    window.dispatchEvent(navEvent);
    return document.createElement('div');
}
