import { element } from 'utils/dom.js';
import { toggleModalOverlay } from 'utils/binders.js';
import { collections } from 'data/collection.js';
import { isoToInput, inputToISO } from 'utils/dates.js';


export function EditTaskForm(task, showModal) {

    let form;
    
    const saveChanges = (e) => {
        if (form.reportValidity()) {
            collections.tasks
            .update(task._id, {
                title: form.elements.title.value,
                dueDate: inputToISO(form.elements.dueDate.value)
            });
        }        
        return false;
    }

    const deleteTask = () => {
        collections.tasks.delete(task._id);
        return false;
    }

    const closeForm = () => {
        showModal.false();
        return false;
    }

    return (
        form = element('form', {
            className: 'form overlay',
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
                value: isoToInput(task.dueDate)
            }),
            element('label', {
                className: 'label',
                textContent: 'Delete'
            }),
            element('div', {className: 'form-button-row'},
                element('button', {
                    className: 'button button-secondary',
                    textContent: 'Delete',
                    onclick: deleteTask
                }),
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