import { element } from 'utils/dom.js';
import state from 'data/state.js';
import { disable } from 'utils/binders.js';
import { ObservableBool } from 'utils/observable.js';

export const DeleteDomainButton = (_id) => {

    const disableButton = new ObservableBool(false);

    const onclick = () => {
        disableButton.true();
        state.domains.deleteById(_id).then(() => disableButton.false());
    }

    return (
        element('button', { 
            textContent: 'Delete', 
            onclick,
            bind: [[disableButton, disable]]
        })
    )
}