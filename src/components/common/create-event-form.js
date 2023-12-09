import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import state from 'data/state.js';
import { disable } from 'utils/binders.js';
import { DomainSelect } from 'components/common/domain-select.js';

export const CreateEventForm = () => {

    const disableSubmit = new ObservableBool(false);

    const create = (event) => {
        event.preventDefault();
        disableSubmit.true();
        const form = event.target.parentElement;
        if (form.reportValidity()) {
            const name = form.elements.name.value;
            const date = form.elements.date.value;
            const domainId = form.elements.domainId.value;
            state.events.create({name, date, domainId}).then(() => {
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
            element('input', {
                type: 'date',
                name: 'date',
                placeholder: 'date',
                required: true
            }),
            DomainSelect(),
            element('button', {
                onclick: create,
                textContent: 'Create Event',
                bind:[[disableSubmit, disable]]
            })
        )
    )
}
