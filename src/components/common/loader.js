import { element } from 'utils/dom.js';
import state from 'data/state.js';
import { showIfTrueHideIfNot } from 'utils/binders.js';

export const Loader = () => {   
    return (
        element('div', {
            textContent: 'Loading...',
            bind: [[state.loading, showIfTrueHideIfNot]]
        })
    );
}