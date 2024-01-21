import { element } from 'utils/dom.js';
import state from 'data/state.js';

export const Alert = (msg) => {   

    const handleLoading = (el, value) => {
        if (value) {
            el.style.zIndex = 2;
            el.style.opacity = 1;
        } else {
            el.style.zIndex = -1;
            el.style.opacity = 0;
        }
    }

    const handleClick = () => {
        state.alert.set(null);
    }
    
    return (
        element('div', {
            className: 'loader',
            bind: [[state.alert, handleLoading]]
        },
            element('h2', {
                className: 'h4',
                textContent: 'Uh Oh!',
            }),
            element('p', {textContent: 'Sorry, that user name is already in use!'}),
            element('button', {
                className: 'button button-primary',
                textContent: 'Close',
                onclick: handleClick
            })
        )
    );
}
