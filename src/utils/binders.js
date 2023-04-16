export function setValue (el, value) {
    el.value = value;
}

export function show(el, value) {
    el.hidden = !value;
}

export function disable(el, value) {
    el.disabled = value;
}

export function repeat(el, list, createElement) {
    var child = el.lastElementChild; 
    while (child) {
        el.removeChild(child);
        child = el.lastElementChild;
    }
    list.forEach((item) => {
        el.appendChild(createElement(item));
    });
}
