import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { disable, dispayIfTrueHideIfNot } from 'utils/binders.js';
import { state } from 'data/state.js';
import { formatDate } from 'utils/dates.js'; 

export function TaskCreationModal(isModalOpen) {

    const disableSubmit = new ObservableBool(false);

    const submit = (event) => {
        event.preventDefault();
        const form = event.target;
        const isValid = form.reportValidity();
        if (isValid) {
            disableSubmit.true();
            state.loading.true();
            const name = form.elements.name.value;
            const dueDate = formatDate(form.elements.dueDate.value);
            state.tasks.create({ name, dueDate })
            .then(({status}) => {
                if (status < 300) {
                    isModalOpen.false();
                    form.reset();
                }
                disableSubmit.false();
                state.loading.false();
            });
        }
    }

    return (
        element('div', {bind: [[isModalOpen, dispayIfTrueHideIfNot]]},
            element('h1', {textContent: 'Create Task'}),
            element('form', {onsubmit: submit},
                element('div', {},
                    element('label', {
                        textContent: 'Name', 
                        for: 'taskName'
                    }),
                    element('input', {
                        type: 'text',
                        id: 'taskName',
                        name: 'name',
                        required: true
                    })
                ),
                element('div', {},
                    element('label', {
                        textContent: 'Due', 
                        for: 'dueDate'
                    }),
                    element('input', {
                        type: 'date',
                        id: 'dueDate',
                        name: 'dueDate',
                        required: true
                    })
                ),
                element('button', {
                    type: 'button',
                    textContent: 'Cancel',
                    onclick: () => isModalOpen.false()
                }),
                element('input', {
                    type: 'submit',
                    value: 'Create',
                    bind:[[disableSubmit, disable]]
                })
            )
        )
    )
}