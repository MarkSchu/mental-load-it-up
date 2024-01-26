import { element, bind } from 'utils/dom.js';
import { alerts } from 'data/alerts.js';


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

export const Alert = () => {   

    const show = (el) => {
        el.style.zIndex = 2;
        el.style.opacity = 1;
    }

    const hide = (el) => {
        el.style.zIndex = -1;
        el.style.opacity = 0;
    }

    const handleEvent = (el, data) => {
        if (data?.type === 'creating') {
            show(el);
        }
        if (data?.type === 'loading') {
            show(el);
        }
        if (data?.type === 'error') {
            show(el);
        }
        if (data?.type === 'close') {
            hide(el);
        }
    }


    return (
        element('div', {
            className: 'alert',
            bind: [[alerts, handleEvent]],
        },
            bind(alerts, (data) => {
                if (data?.type === 'creating') {
                    return Creating()
                }
                if (data?.type === 'loading') {
                    return Loading()
                }
                if (data?.type === 'error') {
                    return Error(data.msg);
                }
                return element('span', {}) 
            })
        )
    );
}

