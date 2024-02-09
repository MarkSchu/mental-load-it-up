import { element, render } from 'utils/dom.js';
import { alerts } from 'data/alerts.js';
import {  showAlertOverlay, hideOverlay, } from 'utils/binders.js';


const Saving = (msg) => {
    return (
        element('div', {className: 'saving'},
            element('div', {className: 'spinner'}),
            element('h2', {textContent: msg})
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
        element('div', {className: 'error'},
            element('h2', {textContent: 'Uh Oh!'}),
            element('p', {textContent: msg}),
            element('button', {
                className: 'button button-primary',
                textContent: 'Close',
                onclick
            })
        )
    )
}

const handleAlert = (el, {type, msg}) => {
    if (type === 'loading') {
        showAlertOverlay(el);
        render(el, Loading());
    }
    
    if (type === 'creating') {
        showAlertOverlay(el);
        render(el, Saving('Creating...'));
    }

    if (type === 'deleting') {
        showAlertOverlay(el);
        render(el, Saving('Deleting...'));
    }
    
    if (type === 'saving') {
        showAlertOverlay(el);
        render(el, Saving('Saving...'))
    }
    if (type === 'error') {
        render(el, Error(msg));
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