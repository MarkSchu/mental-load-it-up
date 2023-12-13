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

function Modal(modalIsOpen) {

    return (
        element('div', {
            bind: [[modalIsOpen, (el, val) => {
                el.style.display = val ? 'block' : 'none'
                console.log(val)
            }]],
        style: {
            position: 'fixed',
            top: '16px',
            bottom: '16px',
            display: 'none',
            left: '16px',
            right: '16px',
            backgroundColor: 'white',
            zIndex: 2,
            border: '1px solid #ccc',
            borderRadius: '16px',
            padding: '16px'
        }},
            element('div', {},
                element('h1', {textContent: 'Edit Task', style: {textAlign: 'center', textDecoration: 'underline'}}),
                element('h3', {textContent: 'Title'}),
                element('input', {type: 'text'}),
                element('h3', {textContent: 'Date'}),
                element('input', {type: 'date'}),
                element('h3', {textContent: 'Category'}),
                element('select', {}, 
                    element('option', {textContent: 'christmas'})
                ),
                element('div', {},
                    element('button', {textContent: 'Create'}),
                    element('button', {textContent: 'Cancel'})
                )
            )
        )
    )
}

export const TaskItem = (task) => {

    const modalIsOpen = new ObservableBool(false);

    const onclick = () => {
        modalIsOpen.toggle();
    }

    return (
        element('div', {className: 'task', onclick},
            Modal(modalIsOpen),
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
        },
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
