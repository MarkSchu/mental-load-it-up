import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import state from 'data/state.js';
import { disable, show, hide } from 'utils/binders.js';
import { DomainSelect } from 'components/common/domain-select.js';

const parentStyle = {
    // padding: '16px',
    // border: '1px solid black',
    // borderRadius: '16px',
    // marginBottom: '16px'
}

export const CreateTaskForm = (onCancel, onSubmit) => {

    let el;
    
    const disableSubmit = new ObservableBool(false);
    const isModalOpen = new ObservableBool(false);

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

    const cancel = () => {
        isModalOpen.false();
    }

    document.addEventListener("click", (event) => {
        if (!el.contains(event.target)) {
            isModalOpen.false();
        }
    });
    

    return el = (
        element('div', {},
            element('button', {
                textContent: 'Add Task',
                onclick: () => isModalOpen.true(),
                bind: [[isModalOpen, hide]]
            }),
            element('div', {
                className: 'task-panel',
                bind: [[isModalOpen, show]]
            },
                element('form', {},
                    element('input', {
                        type: 'text',
                        name: 'name',
                        placeholder: 'name',
                        required: true
                    }),
                    element('input', {
                        type: 'date',
                        name: 'dueDate',
                        placeholder: 'dueDate',
                        required: true
                    })
                ),
                element('div', {},
                    element('button', {
                        onclick: cancel,
                        textContent: 'Cancel',
                        bind:[[disableSubmit, disable]]
                    }),
                    element('button', {
                        onclick: create,
                        textContent: 'Add Task',
                        bind:[[disableSubmit, disable]]
                    })
                )
            )
        )
    )
}
