import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import state from 'data/state.js';
import { disable } from 'utils/binders.js';

export const EditDomainForm = (domain) => {

    const disableSubmit = new ObservableBool(false);

    const save = (e) => {
        e.preventDefault();
        disableSubmit.true();
        const form = e.target.parentElement;
        if (form.reportValidity()) {
            const name = form.elements.name.value;
            state.domains.updateById(domain._id, {name}).then(() => {
                disableSubmit.false();
                form.reset();
            });
        } else {
            disableSubmit.false();
        }
    }

    return (
        element('form', {},
            element('input', {
                type: 'text',
                name: 'name',
                placeholder: 'name',
                value: domain.name,
                required: true
            }),
            element('button', {
                onclick: save,
                textContent: 'Save Changes',
                bind:[[disableSubmit, disable]]
            })
        )
    )
}
