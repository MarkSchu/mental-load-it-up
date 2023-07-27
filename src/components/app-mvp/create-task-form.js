import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import state from 'data/state.js';
import { disable } from 'utils/binders.js';
import { DomainSelect } from 'components/app-mvp/domain-select.js';

export const CreateTaskForm = () => {

    const disableSubmit = new ObservableBool(false);

    const create = (event) => {
        event.preventDefault();
        disableSubmit.true();
        const form = event.target.parentElement;
        if (form.reportValidity()) {
            const name = form.elements.name.value;
            const dueDate = form.elements.dueDate.value;
            const domainId = form.elements.domainId.value;
            state.tasks.create({name, dueDate, domainId}).then(() => {
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
                name: 'dueDate',
                placeholder: 'dueDate',
                required: true
            }),
            DomainSelect(),
            element('button', {
                onclick: create,
                textContent: 'Create Task',
                bind:[[disableSubmit, disable]]
            })
        )
    )
}
