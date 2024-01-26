import { element } from 'utils/dom.js';
import { collections } from 'data/collection.js';
import { repeatWith } from 'utils/binders.js';

function TaskPanel(task) {
    return (
        element('div', {className: 'task-panel'},
            element('div', {className: 'task-title-parent'},
                element('div', {
                    className: 'text task-title',
                    textContent: task.title,
                })
            ),
            element('input', {
                className: 'checkbox',
                type: 'checkbox' 
            })
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

/*
task creation behavior 

write out
click create 
task panel created and open in pre-edit mode

    ------------------------------
    delete  |  edit  ????

off click takes task out of pre-edit mdoe
*/