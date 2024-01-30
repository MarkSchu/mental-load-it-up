import { element, render } from 'utils/dom.js';
import { alerts } from 'data/alerts.js';
import {  showOverlay, hideOverlay, } from 'utils/binders.js';


const Creating = () => {
    return (
        element('div', {},
            element('div', {className: 'spinner'}),
            element('h2', {textContent: 'Creating...'})
        )
    )
}

const Loading = () => {
    return (
        element('div', {},
            element('div', {className: 'spinner'}),
            element('h2', {textContent: 'Loading...'})
        )
    )
}

const Error = (msg) => {
    
    const onclick = () => {
        alerts.close();
    }

    return (
        element('div', {},
            element('h2', {textContent: 'Uh oh!'}),
            element('p', {textContent: msg}),
            element('button', {
                className: 'button button-primary',
                textContent: 'Close',
                onclick
            })
        )
    )
}

const handleAlert = (el, {type}) => {
    if (type === 'creating') {
        showOverlay(el);
        render(el, Creating());
    }
    if (type === 'loading') {
        showOverlay(el);
        render(el, Loading());
    }
    if (type === 'error') {
        render(el, Error(''));
    }
    if (type === 'close') {
        hideOverlay(el);
    }
}

export const Alert = () => {
    return (
        element('div', {
            className: 'overlay',
            listen: [[alerts, handleAlert]],
        })
    )
}