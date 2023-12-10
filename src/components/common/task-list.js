import { element, repeat } from 'utils/dom.js';
import state from 'data/state.js';
import { repeatWith } from 'utils/binders.js';
import { ObservableBool } from 'utils/observable.js';
import { disable, hide, show } from 'utils/binders.js';


export const xxTaskItem = (task) => {

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

export const TaskItem = (task) => {
    return (
        element('div', {className: 'task'},
            element('div', {className: 'task-name-wrap'},
                element('div', {
                    className: 'task-name',
                    textContent: task.name
                }),
            ),
            element('div', {className: 'task-pill-wrap'},
                element('div', {
                    className: `pill ${task.tags[0]}`, 
                    textContent: task.tags[0]
                })
            ),
            element('div', {className: 'task-days-wrap'},
                element('div', {
                    className: 'task-days', 
                    textContent: task.days
                })
            ),
            element('div', {className: 'task-done-wrap'},
                element('div', {
                    className: 'task-done checkbox', 
                })
            ),
        )
    )
}

export const TaskList = () => {

    const tasks = [
        {
            name: 'cut the grass', 
            days: 1,
            tags: ['house']
        },
        {
            name: 'take back pants to banana republic', 
            days: 4,
            tags: ['misc']
        },
        {
            name: 'set up the christas tree', 
            days: 7,
            tags: ['christmas']
        },
        {
            name: 'buy gifts for oofta, sally, lisa, charlie, blop, and jala', 
            days: 7,
            tags: ['christmas']
        },
        {
            name: 'buy more coconut milk', 
            days: 11,
            tags: ['grocery']
        }
    ]
   
    return (
        element('div', {},
            // element('div', {
            //     bind: [[state.tasks, repeatWith(TaskItem)]]
            // })
            repeat(tasks, TaskItem)
        )
    )
}
