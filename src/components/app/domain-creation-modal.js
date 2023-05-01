import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { disable, dispayIfTrueHideIfNot } from 'utils/binders.js';
import { state } from 'data/state.js';
import { formatDate } from 'utils/dates.js'; 

export function DomainCreationModal(isModalOpen) {

    const disableSubmit = new ObservableBool(false);

    const submit = (event) => {
        event.preventDefault();
        const form = event.target;
        const isValid = form.reportValidity();
        if (isValid) {
            disableSubmit.true();
            state.loading.true();
            const name = form.elements.name.value;
            state.domains.create({ name })
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
            element('h1', {textContent: 'Create Domain'}),
            element('form', {onsubmit: submit},
                element('div', {},
                    element('label', {
                        textContent: 'Name', 
                        for: 'domainName'
                    }),
                    element('input', {
                        type: 'text',
                        id: 'domainName',
                        name: 'name',
                        required: true
                    })
                ),
                element('button', {
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