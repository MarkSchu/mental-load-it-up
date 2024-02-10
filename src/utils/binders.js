export const disableOnRequest = (el, data) => {
    if (data?.supertype === 'request') {
        el.disabled = true;
    } else {
        el.disabled = false;
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
    // el is the parent
    var child = el.lastElementChild; 
    while (child) {
        el.removeChild(child);
        child = el.lastElementChild;
    }
    list.forEach((item) => {
        el.appendChild(createElement(item));
    });
}


