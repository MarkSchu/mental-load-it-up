import { element } from 'utils/dom.js';
import state from 'data/state.js';

export const Saving = () => {   

    const handleLoading = (el, value) => {
        if (value) {
            el.style.zIndex = 2;
            el.style.opacity = 1;
        } else {
            el.style.zIndex = -1;
            el.style.opacity = 0;
        }
    }

    setTimeout(() => {
        state.loading.true()
    }, 2000)

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
