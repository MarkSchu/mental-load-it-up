import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { toggleModalOverlay } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { isoToInput, inputToISO } from 'utils/dates.js';
import { DomainSelect } from 'components/common/domain-select.js';
import { DueDateInpout } from 'components/common/duedate-input.js';


export function TaskEditForm(task, showModal) {
    
    let form;
    
    const saveChanges = (e) => {
        if (form.reportValidity()) {
            collections.tasks
            .update(task._id, {
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
                    textContent: 'Edit Task'
                }),
                element('label', {
                    className: 'label',
                    textContent: 'Title'
                }),
                element('textarea', {
                    className: 'input',
                    rows: 3,
                    name: 'title',
                    value: task.title,
                    required: true
                }),
                element('label', {
                    className: 'label',
                    textContent: 'Due Date'
                }),
                // DueDateInpout(task),
                element('div', {className: 'date-temp-wrap'},
                    element('input', {
                        className: 'date-temp',
                        type: 'date', 
                        name: 'dueDate',
                        value: isoToInput(task.dueDate)
                    })
                ),
                element('label', {
                    className: 'label',
                    textContent: 'Tag'
                }),
                DomainSelect(task)
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