import { element } from 'utils/dom.js';
import state from 'data/state.js';

export const Loader = (msg) => {   

    const handleLoading = (el, value) => {
        if (value) {
            el.style.zIndex = 2;
            el.style.opacity = 1;
        } else {
            el.style.zIndex = -1;
            el.style.opacity = 0;
        }
    }
    
    return (
        element('div', {
            className: 'loader',
            bind: [[state.loading, handleLoading]]
        },
            element('div', {className: 'spinner'}),
            element('h2', {
                className: 'h4',
                textContent: 'Loading...',
            })
        )
    );
}
