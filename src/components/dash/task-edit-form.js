import { element } from 'utils/dom.js';
import { toggleModalOverlay } from 'utils/binders.js';
import { collections } from 'data/collection.js';
import { dateInputToUTC, utcToDateInput } from 'utils/dates.js';


export function EditTaskForm(task, showModal) {
    
    const onsubmit = (e) => {
        const form = e.target;
        if (form.reportValidity()) {
            collections.tasks
            .update(task._id, {
                title: form.elements.title.value,
                dueDate: dateInputToUTC(form.elements.dueDate.value)
            });
        }        
        return false;
    }

    const onclick = (e) => {
        e.stopPropagation();
    }

    const closeForm = () => {
        showModal.false();
        return false;
    }

    return (
        element('form', {
            className: 'form overlay',
            onsubmit,
            onclick,
            bind: [[showModal, toggleModalOverlay]]
        },
            element('h1', {
                className: 'h1 form-h1',
                textContent: 'Edit Task'
            }),
            element('label', {
                className: 'label',
                textContent: 'Title'
            }),
            element('input', {
                className: 'input form-input',
                type: 'text',
                name: 'title',
                value: task.title,
                required: true
            }),
            element('label', {
                className: 'label',
                textContent: 'Due Date'
            }),
            element('input', {
                className: 'input form-input',
                type: 'date',
                name: 'dueDate',
                onchange: (e) => { 
                    console.log(new Date(e.target.valueAsNumber))

                }
                // value: utcToDateInput(task.dueDate)
            }),
            element('div', {className: 'form-button-row'},
                element('button', {
                    className: 'button button-secondary',
                    textContent: 'Cancel',
                    onclick: closeForm
                }),
                element('button', {
                    className: 'button button-primary',
                    textContent: 'Save',
                })
            )
        )
    )
}