import { element, repeat } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';

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
        name: 'Go buy a bunch of gear from REI and then go to the Himilayas. Once there, buy a permit to climb mount everest. Then head to basecamp. Then climb mount everest. At the top, shout to the Universe!', 
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
    },
    {
        name: 'buy more coconut milk', 
        days: 11,
        tags: ['grocery']
    },
    {
        name: 'buy more coconut milk', 
        days: 11,
        tags: ['grocery']
    },
    {
        name: 'buy more coconut milk', 
        days: 11,
        tags: ['grocery']
    },
    {
        name: 'buy more coconut milk', 
        days: 11,
        tags: ['grocery']
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
            element('div', {className: 'task-title-parent'},
                element('div', {
                    className: 'text task-title',
                    textContent: task.name,
                })
            ),
            element('input', {
                className: 'checkbox',
                type: 'checkbox' 
            })
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

function xDashFooter () {
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

function DashFooter () {
    return (
        element('div', {className: 'dash-footer'},
            element('div', {style: { marginBottom: '4px', display: 'flex'}}, 
                // element('button', {
                //     className: 'button button-primary create-button',
                //     textContent: 'Add a Task!'
                // })
                element('input', {
                    style: {
                        width: '100%',
                        marginRight: '4px'
                    },
                    className: 'input',
                    type: 'text'
                }),
                element('button', {
                    className: 'button button-primary',
                    textContent: 'Add'
                })
            ),
            element('div', {}, 
                element('select', {
                    className: 'select button-secondary select-button '
                },
                    element('option', {textContent: 'Tasks'})
                )
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