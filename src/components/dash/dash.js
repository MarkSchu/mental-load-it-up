import { element, repeat } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
// import { TaskList } from 'components/dash/task-list.js';
// import { CreateTaskForm } from 'components/common/create-task-form.js';

// function HeadingSelect() {
//     return (
//         element('select', {className: 'dash-header-select'},
//             element('option', {textContent: 'Tasks'}),
//             element('option', {textContent: 'Events'}),
//             element('option', {textContent: 'Tags'}),
//         )
//     )
// }

// function HeadingMenu() {
//     return (
//         element('div', {className: 'dash-header-menu'},
//             element('a', {textContent: 'Account'}),
//             element('a', {textContent: 'Logout'}),
//         )
//     )
// }

// function DashHeader() {
//     return (
//         element('div', {className: 'dash-header'},
//             HeadingSelect(),
//             HeadingMenu()
//         )
//     )
// }

// function DashFooter() {

//     const isModalOpen = new ObservableBool(false);

//     const onclick = () => {
//         isModalOpen.true();
//     }

//     const showModal = (el, val) => {
//         el.style.display = val ? 'block' : 'none';
//     }

//     return (
//         element('div', {className: 'dash-footer'},
//             element('div', {
//                 className: 'modal',
//                 bind: [[isModalOpen, showModal]]
//             },  
//                 // CreateTaskForm(isModalOpen)
//             ),
//             element('button', {
//                 className: 'create-button button button-primary',
//                 textContent: 'Create',
//                 onclick
//             })
//         )
//     )
// }

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
        days: 201,
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
        days: 341,
        tags: ['christmas']
    },
    {
        name: 'buy more coconut milk', 
        days: 11,
        tags: ['grocery']
    }
]

function TaskPanel(task) {
    return (
        element('div', {className: 'task-panel'},
            element('div', {
                textContent: '> ' + task.name,
                className: 'text'
            }),
            element('div', {},
                element('input', {
                    className: 'checkbox',
                    type: 'checkbox'
                })
            )
        )
    )
}

function List () {
    return (
        element('div', {className: 'dash-list'},
            repeat(tasks, TaskPanel)
        )
    )
}

function DashFooter () {
    return (
        element('div', {className: 'dash-footer'},
            element('div', {}, 
                element('select', {
                    className: 'select button-secondary select-button '
                },
                    element('option', {textContent: 'Tasks'})
                )
            ),
            element('div', {}, 
                element('button', {
                    className: 'button button-primary create-button',
                    textContent: 'Add a Task!'
                })
            )
        )
    )
}

export function Dash() {
    return (
        element('div', {},
            List(),
            DashFooter()
        )
    )
}