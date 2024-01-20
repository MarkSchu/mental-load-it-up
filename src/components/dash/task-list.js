import { element, repeat, bind } from 'utils/dom.js';
import state from 'data/state.js';
import { repeatWith } from 'utils/binders.js';
import { ObservableBool, ObservableVar } from 'utils/observable.js';
import { disable, hide, show } from 'utils/binders.js';


function Modal(isModalOpen, taskToEdit) {

    const displayModal = (el, val) => {
        val
        ? el.classList.add('open')
        : el.classList.remove('open');
    }
    
    return (
        element('div', {
            className: 'modal',
            bind: [[isModalOpen, displayModal]]
        },
            element('div', {className: 'modal-foreground'},
                bind(taskToEdit, (task) =>
                    element('div', {},
                        element('h1', {textContent: 'Edit Task'}),
                        element('form', {},
                            element('h3', {textContent: 'Title'}),
                            element('textarea', {
                                className: 'textarea',
                                name: 'name',
                                placeholder: 'name',
                                value: task.name,
                                required: true
                            }),
                            element('h3', {textContent: 'Due Date'}),
                            element('input', {
                                className: 'input',
                                type: 'date',
                                name: 'dueDate',
                                placeholder: 'dueDate',
                                value: task.dueDate,
                                required: true
                            }),
                            element('h3', {textContent: 'Tag'}),
                            element('input', {
                                className: 'input',
                                type: 'date',
                                name: 'dueDate',
                                placeholder: 'dueDate',
                                value: task.dueDate,
                                required: true
                            })
                        ),
                        element('div', {className: 'modal-footer'},
                            element('button', {
                                className: 'button button-secondary',
                                textContent: 'Cancel'
                            }),
                            element('button', {
                                className: 'button button-primary',
                                textContent: 'Create'
                            })
                        )
                    )
                )
            )
        )
    )
}

export const TaskItem = (task, isModalOpen, taskToEdit) => {

    const onclick = () => {
        isModalOpen.true();
        taskToEdit.set(task);
    }

    return (
        element('div', {className: 'task', onclick},
            element('div', {className: 'task-title-wrap'},
                element('div', {
                    className: 'task-title',
                    textContent: task.name
                })
            ),
            element('div', {className: 'task-tag-wrap'},
                element('div', {
                    className: `tag ${task.tags[0]}`, 
                    textContent: task.tags[0]
                })
            ),
            element('div', {className: 'task-time-wrap'},
                element('div', {
                    className: 'task-time', 
                    textContent: task.days
                })
            ),
            element('div', {className: 'task-done-wrap'},
                element('div', {
                    className: 'task-done', 
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

    const isModalOpen = new ObservableBool(false);
    const taskToEdit = new ObservableVar({});
   
    return (
        element('div', {},
            // element('div', {
            //     bind: [[state.tasks, repeatWith(TaskItem)]]
            // })
            repeat(tasks, (task) => TaskItem(task, isModalOpen, taskToEdit)),
            // Modal(isModalOpen, taskToEdit)
        )
    )
}
