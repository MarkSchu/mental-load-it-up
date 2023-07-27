import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import state from 'data/state.js';
import { disable } from 'utils/binders.js';

export const CreateDomainForm = () => {

    const disableSubmit = new ObservableBool(false);

    const create = (event) => {
        event.preventDefault();
        disableSubmit.true();
        const form = event.target.parentElement;
        if (form.reportValidity()) {
            const name = form.elements.name.value;
            state.domains.create({name}).then(() => {
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
                required: true
            }),
            element('button', {
                onclick: create,
                textContent: 'Create Domain',
                bind:[[disableSubmit, disable]]
            })
        )
    )
}
