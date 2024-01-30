import { element } from 'utils/dom.js';
import { toggleOverlay } from 'utils/binders.js';
import { getDateInputValue } from 'utils/dates.js';
import { collections } from 'data/collection.js';


export function EditTaskForm(task, showModal) {

    const onsubmit = () => {
        const form = e.target;
        if (form.reportValidity()) {
            collections.tasks
            .update(task._id, {
                
            })
        }
        return false;
    }

    const onclick = (e) => {
        e.stopPropagation();
    }

    const closeForm = () => {
        showModal.false();
    }
    
    var date = getDateInputValue(task.dueDate);
    console.log(date)

    return (
        element('form', {
            className: 'form overlay',
            onsubmit,
            onclick,
            bind: [[showModal, toggleOverlay]]
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
                value: ''
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