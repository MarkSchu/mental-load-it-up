
export function setValue (el, value) {
    el.value = value;
}

export function show(el, value) {
    el.hidden = !value;
}

export function hide(el, value) {
    el.hidden = value;
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

export function showIfTrueHideIfNot(el, value) {
    el.hidden = !value;
}

export function showIfFalseHideIfTrue(el, value) {
    el.hidden = value;
}

export function dispayIfTrueHideIfNot(el, value) {
    el.style.display = value ? 'block' : 'none';
}

// ---

export const repeatWith = (createElement) => (el, list) => {
    var child = el.lastElementChild; 
    while (child) {
        el.removeChild(child);
        child = el.lastElementChild;
    }
    list.forEach((item) => {
        el.appendChild(createElement(item));
    });
}