import { element, bind } from 'utils/dom.js';
import { show } from 'utils/binders.js';

export function EditTaskForm(task, showModal) {
    const onsubmit = () => {
        return false;
    }

    return (
        element('form', {
            className: 'full-screen',
            onsubmit,
            bind: [[showModal, show]]
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
                type: 'text',
                name: 'dueDate',
                value: task.dueDate
            }),
            element('button', {
                className: 'button button-primary',
                textContent: 'Save',
                // bind:[[disableSubmit, disable]]
            })
        )
    )
}