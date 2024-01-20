import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import state from 'data/state.js';
import { disable, show, hide } from 'utils/binders.js';
import { DomainSelect } from 'components/common/domain-select.js';


export const CreateTaskForm = (isModalOpen) => {
    
    const disableSubmit = new ObservableBool(false);

    const create = (event) => {
        event.preventDefault();
        disableSubmit.true();
        const form = event.target.parentElement;
        if (form.reportValidity()) {
            const name = form.elements.name.value;
            const dueDate = form.elements.dueDate.value;
            const domainId = form.elements.domainId.value;
            state.tasks.create({name, dueDate}).then(() => {
                disableSubmit.false();
                form.reset();
                onSubmit();
            });
        } else {
            disableSubmit.false();
        }
    }

    const cancel = (e) => {
        console.log('cancel')
        e.preventDefault();
        isModalOpen.false();
    }

    return (
        element('form', {className: 'form'},
            element('h2', {className: 'h2', textContent: 'Create Task'}),
            element('label', {
                className: 'label',
                textContent: 'Title'
            }),
            element('input', {
                className: 'input',
                name: 'name',
                required: true
            }),
            element('label', {
                className: 'label',
                textContent: 'Due Date & Time'
            }),
            element('input', {
                className: 'input',
                type: 'date',
                name: 'dueDate',
                required: true
            }),
            element('div', {className: 'line-break'}),
            element('div', {},
                element('button', {
                    onclick: cancel,
                    textContent: 'Cancel',
                    className: 'button',
                    bind:[[disableSubmit, disable]]
                }),
                element('button', {
                    onclick: create,
                    textContent: 'Create',
                    className: 'button',
                    bind:[[disableSubmit, disable]]
                })
            )
        )
    )
}
