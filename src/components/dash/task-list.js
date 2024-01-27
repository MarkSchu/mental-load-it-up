import { element, repeat } from 'utils/dom.js';
import { collections } from 'data/collection.js';
import { repeatWith } from 'utils/binders.js';

function TaskPanel(task) {
    return (
        element('div', {
            className: 'task-panel',
        },
            element('input', {
                className: 'checkbox',
                type: 'checkbox' 
            }),
            element('div', {className: 'task-title-parent'},
                element('div', {
                    className: 'text task-title',
                    textContent: task.title
                }),
            ),
            element('div', {
                className: 'days',
                style: {visibility: task.dueDate ? 'visible' : 'hidden'}
            },
                element('div', {
                    className: 'days-number',
                    textContent: `${Math.floor((Math.random() * 100))}`
                }),
                element('div', {
                    className: 'days-word',
                    textContent: 'days'
                })
            ),
        )
    )
}

export function TaskList () {
    return (
        element('div', {
            className: 'dash-list',
            bind: [[collections.tasks, repeatWith(TaskPanel)]]
        })
    )
}
