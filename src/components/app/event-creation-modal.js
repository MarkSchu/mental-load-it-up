import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { disable, dispayIfTrueHideIfNot } from 'utils/binders.js';
import { state } from 'data/state.js';
import { formatDate } from 'utils/dates.js'; 

export function EventCreationModal(isModalOpen) {

    const disableSubmit = new ObservableBool(false);

    const submit = (event) => {
        event.preventDefault();
        const form = event.target;
        const isValid = form.reportValidity();
        if (isValid) {
            disableSubmit.true();
            state.loading.true();
            const name = form.elements.name.value;
            const date = formatDate(form.elements.date.value);
            state.events.create({ name, date })
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
            element('h1', {textContent: 'Create Event'}),
            element('form', {onsubmit: submit},
                element('div', {},
                    element('label', {
                        textContent: 'Name', 
                        for: 'eventName'
                    }),
                    element('input', {
                        type: 'text',
                        id: 'eventName',
                        name: 'name',
                        required: true
                    })
                ),
                element('div', {},
                    element('label', {
                        textContent: 'Date', 
                        for: 'eventDate'
                    }),
                    element('input', {
                        type: 'date',
                        id: 'eventDate',
                        name: 'date',
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
                    bind:[[disableSubmit, disable]],
                })
            )
        )
    )
}