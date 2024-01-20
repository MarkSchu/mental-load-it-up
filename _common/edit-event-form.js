import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import state from 'data/state.js';
import { disable } from 'utils/binders.js';
import { DomainSelect } from 'components/common/domain-select.js';

export const EditEventForm = (event) => {

    const disableSubmit = new ObservableBool(false);

    const create = (e) => {
        e.preventDefault();
        disableSubmit.true();
        const form = e.target.parentElement;
        if (form.reportValidity()) {
            const name = form.elements.name.value;
            const date = form.elements.date.value;
            const domainId = form.elements.domainId.value;
            state.events.updateById(event._id, {name, date, domainId}).then(() => {
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
                value: event.name,
                required: true
            }),
            element('input', {
                type: 'date',
                name: 'date',
                placeholder: 'date',
                value: event.date,
                required: true
            }),
            DomainSelect(event.domainId),
            element('button', {
                onclick: create,
                textContent: 'Save Changes',
                bind:[[disableSubmit, disable]]
            })
        )
    )
}
