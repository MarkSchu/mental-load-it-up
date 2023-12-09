import { element, bind } from 'utils/dom.js';
import state from 'data/state.js';
import { repeatWith } from 'utils/binders.js';
import { ObservableBool } from 'utils/observable.js';
import { disable, hide, show } from 'utils/binders.js';


const displayDomainName = (task) => (el, domains) => {
    const domain = domains.find(item => item._id === task.domainId);
    if (domain) {
        el.textContent = `domain: ${domain.name}`;
    }
}

export function OpenTask(task, isOpenTask) {

    const disableSubmit = new ObservableBool(false);

    const cancel = () => {
        isOpenTask.false();
    }

    const save = () => {}

    return (
        element('div', {
            style, 
            bind: [[isOpenTask, show]]
        },
            element('form', {},
                element('input', {
                    type: 'text',
                    name: 'name',
                    placeholder: 'name',
                    required: true,
                    value: task.name,
                }),
                element('input', {
                    type: 'date',
                    name: 'dueDate',
                    placeholder: 'dueDate',
                    required: true,
                    value: task.dueDate
                })
            ),
            element('div', {className: 'button-row'},
                element('button', {
                    onclick: cancel,
                    textContent: 'Cancel',
                    bind:[[disableSubmit, disable]]
                }),
                element('button', {
                    onclick: save,
                    textContent: 'Save',
                    bind:[[disableSubmit, disable]]
                })
            )
        )
    )
}

export function DisplayTask(task, isOpenTask) {

    const style = {
        cursor: 'pointer'
    }

    return (
        element('div', {
            style,
            onclick: () =>  isOpenTask.true(),
            bind: [[isOpenTask, hide]]
        },
            element('div', {textContent: task.name})
        )
    )
}

export const TaskItem = (task) => {

    let el;
    const isOpenTask = new ObservableBool(false);
    const disableSubmit = new ObservableBool(false);

    const handleContainerClick = () => {
        if (!isOpenTask.value) {
            isOpenTask.true();
        }
    }

    const toggleOpenClass = (el, value) => {
        value
        ? el.classList.add('open')
        : el.classList.remove('open');
    }

    const setTabIndex = (el, value) => {
        el.tabIndex = value ? 0 : -1;
    }

    document.addEventListener("click", (event) => {
        const isOutsideContainer = !el.contains(event.target);
        if (isOutsideContainer) {
            isOpenTask.false();
        }
    });

    return el = (
        element('div', {
            className: 'task-list-form-container',
            tabIndex: 0,
            onclick: handleContainerClick,
            bind: [[isOpenTask, toggleOpenClass]]
        },
            element('form', {className: 'task-list-form'},
                element('input', {
                    className: 'name',
                    type: 'text',
                    name: 'name',
                    placeholder: 'name',
                    required: true,
                    value: task.name,
                    onmousedown: (e) => {
                        // if task is open
                        if (!isOpenTask.value) {
                            e.preventDefault();
                            e.target.focus();
                        }
                    }
                }),
                element('input', {
                    className: 'date',
                    type: 'date',
                    name: 'dueDate',
                    placeholder: 'dueDate',
                    required: true,
                    value: task.dueDate
                })
            ),
            element('div', {className: 'buttons'},
                element('button', {
                    textContent: 'cancel',
                    bind:[[disableSubmit, disable]]
                }),
                element('button', {
                    textContent: 'save',
                    bind:[[disableSubmit, disable]]
                })
            )
        )
    )
}

export const TaskList = () => {

    return (
        element('div', {},
            element('div', {
                bind: [[state.tasks, repeatWith(TaskItem)]]
            })
        )
    )
}

