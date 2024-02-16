import { element } from 'utils/dom.js';

export function bind(observable, createElement) {
    let currentEl = createElement(observable.value);
    observable.onEmit((value) => {
        let newEl = createElement(value);
        let parent = currentEl.parentElement;
        if (parent) {
            parent.removeChild(currentEl);
            parent.appendChild(newEl);
        }
        currentEl = newEl;
    });
    return currentEl;
}

export function listen(observable, createElement) {
    let currentEl = element('div', {style: {display: 'none'}});
    observable.onEmit((value) => {
        let newEl = createElement(value);
        let parent = currentEl.parentElement;
        if (parent) {
            parent.removeChild(currentEl);
            parent.appendChild(newEl);
        }
        currentEl = newEl;
    });
    return currentEl;
}

export function repeatWith(createElement) {
    return (el, list) => {
        var child = el.lastElementChild; 
        while (child) {
            el.removeChild(child);
            child = el.lastElementChild;
        }
        list.forEach((item) => {
            el.appendChild(createElement(item));
        });
    }
}

export function showModalOverlay(el) {
    el.style.zIndex = 1;
    el.style.opacity = 1;
}

export function showAlertOverlay(el) {
    el.style.zIndex = 2;
    el.style.opacity = 1;
}

export function hideOverlay(el) {
    el.style.zIndex = -1;
    el.style.opacity = 0;
}

export function toggleModalOverlay(el, value) {
    value
    ? showModalOverlay(el)
    : hideOverlay(el);
}



