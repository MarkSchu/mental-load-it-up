function addChildren(parent, children) {
    children.forEach(child => parent.appendChild(child));
}

function removeChildren(parent, children) {
    children.forEach((child) => {
        parent.removeChild(child);
    });
}

function toListOfChildren(children) {
    return [children].flat();
}

function addAttrs(el, attrs) {
    for (const attr in attrs) {
        if (attr === 'bind') {
            const binders = attrs['bind'];
            binders.forEach((binder) => {
                const observableVar = binder[0];
                const callback = binder[1];
                observableVar.onSet((value) => {
                    callback(el, value);
                });
                callback(el, observableVar.value);
            });
        } else {
            el[attr] = attrs[attr];
        }
    }
}

export function element(tag, attrs) {
    const el = document.createElement(tag);
    addAttrs(el, attrs);

    const children = Array.from(arguments).slice(2).flat();
    children.forEach((child) => {
        el.appendChild(child);
    });
    return el;
}

export function bind(observableVar, callback) {
    let currentChildren = toListOfChildren(callback(observableVar.value));
    observableVar.onSet((value) => {
        let newChildren = toListOfChildren(callback(value));
        let parent = currentChildren[0].parentElement;
        if (parent) {
            removeChildren(parent, currentChildren);
            addChildren(parent, newChildren);
        }
        currentChildren = newChildren;
    });
    return currentChildren;
}

export function bindElement(observableVar, callback) {
    return function(el) {
        observableVar.onSet((value) => {
            callback(el, value);
        });
        return el;
    }
}

export function bindtext(observableVar) {
    const el = element('span', {textContent: observableVar.value});
    observableVar.on((value) => {
        el.textContent = value;
    });
    return el;
}

export function repeatfor(n, createElement) {
    let children = [];
    for (var i=0; i < n; i++) {
        children.push(createElement(i));
    }
    return children;
}

export function repeat(array, createElement) {
    return array.map((item) => {
        return createElement(item);
    });
}

export function bindrepeat(observableArray, callback) {
    return bind(observableArray, (array) => 
        repeat(array, (item) => 
            callback(item)
        )
    )
}