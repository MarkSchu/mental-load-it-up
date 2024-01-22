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

    const display = new ObservableBool();

    const handleAsync = (el, {event, data}) => {
        if (event === 'request') {
            display.true()
        }
        if (event === 'response') {
            if (data.type === 'error') {
                // show error 
            } else {
                // hide
            }
        }
    }

    const handleClick = () => {
        display.false();
    }
    
    return (
        element('div', {
            className: 'loader',
            // bind: [[state.loading, handleLoading]]
            // bind: [[showAsyncMessage, hide]]
            listen: [[async, handleAsync]]
        },
            element('div', {className: 'spinner'}),
            element('h2', {
                className: 'h4',
                textContent: 'Loading...',
            })
        )
    );
}
