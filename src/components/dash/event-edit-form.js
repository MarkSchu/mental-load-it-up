import { element } from 'utils/dom.js';
import { toggleModalOverlay } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { isoToInput, inputToISO } from 'utils/dates.js';
import { DomainSelect } from 'components/common/domain-select.js';


export function EventEditForm(event, showModal) {
    
    let form;
    
    const saveChanges = (e) => {
        if (form.reportValidity()) {
            collections.events
            .update(event._id, {
                title: form.elements.title.value,
                dueDate: inputToISO(form.elements.dueDate.value),
                domain: form.elements.domain.value
            });
        }        
        return false;
    }

    const closeForm = () => {
        showModal.false();
        return false;
    }
  
    return (
        element('div', {
            className: 'form-page overlay',
            bind: [[showModal, toggleModalOverlay]]
        },
            form = element('form', {},
                element('h1', {
                    className: 'h1',
                    textContent: 'Edit Event'
                }),
                element('label', {
                    className: 'label',
                    textContent: 'Title'
                }),
                element('textarea', {
                    className: 'input textarea',
                    rows: 3,
                    name: 'title',
                    value: event.title,
                    required: true
                }),
                element('label', {
                    className: 'label',
                    textContent: 'Category'
                }),
                DomainSelect(event),
                element('label', {
                    className: 'label',
                    textContent: 'Due Date'
                }),
                element('input', {
                    className: 'input',
                    type: 'date', 
                    name: 'dueDate',
                    value: isoToInput(event.dueDate)
                })
            ),
            element('div', {className: 'buttons'},
                element('button', {
                    className: 'button button-secondary',
                    textContent: 'Cancel',
                    onclick: closeForm
                }),
                element('button', {
                    className: 'button button-primary',
                    textContent: 'Save',
                    onclick: saveChanges
                })
            )
        )
    )
}