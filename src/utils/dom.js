function addChildren(parent, children) {
    children.forEach(child => parent.appendChild(child));
}

function clearChildren(el) {
    var child = el.lastElementChild; 
    while (child) {
        el.removeChild(child);
        child = el.lastElementChild;
    }
}

function addBinders(el, attrs) {
    const binders = attrs['bind'];
    binders.forEach((binder) => {
        const observable = binder[0];
        const callback = binder[1];
        observable.onEmit((value) => callback(el, value));
        // call right away! Its bind
        callback(el, observable.value); 
    });
}

function addListeners(el, attrs) {
    const listeners = attrs['listen'];
    listeners.forEach((listener) => {
        const observable = listener[0];
        const callback = listener[1];
        observable.onEmit((value) => callback(el, value));
        // don't call right away, wait for an event to fire
    });
}

function addStyles(el, attrs) {
    const styles = attrs['style'];
    for (var style in styles) {
        el.style[style] = styles[style];
    }
}

function setAttributes(el, attrs) {
    for (const attr in attrs) {

        if (attr === 'bind') {
            addBinders(el, attrs);
        }
        else if (attr === 'listen') {
            addListeners(el, attrs);
        }
        else if (attr === 'style') {
            addStyles(el, attrs);
        }
        else if (attr.startsWith('data-')) {
            el.setAttribute(attr, attrs[attr]);
        }
        else {
            el[attr] = attrs[attr];
        }
    }
}

export function element(tag, attrs) {
    // accepts both multiple child arguments and an array of children
    // ('div', {}, child1, child2)
    // ('div', {}, [child1, child2])
    const el = document.createElement(tag);
    const children = Array.from(arguments).slice(2).flat();
    setAttributes(el, attrs);
    addChildren(el, children);
    return el;
}

export function render(el, newChild) {
    clearChildren(el);
    addChildren(el, [newChild]);
}

export function repeat(array, createElement) {
    // return array of elements
    return array.map((item) => {
        return createElement(item);
    });
}

export function repeatFor(n, createElement) {
    // return array of elements
    let children = [];
    for (var i=0; i < n; i++) {
        children.push(createElement(i));
    }
    return children;
}

export function boolToInlineDisplay(bool) {
    return bool ? 'inline' : 'none';
}

export function boolToBlockDisplay(bool) {
    return bool ? 'block' : 'none';
}

export function display(bool) {
    return bool ? 'initial' : 'none';
}