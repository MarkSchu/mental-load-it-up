import { element } from 'utils/dom.js';
import { collections } from 'data/collection.js';
import { repeatWith } from 'utils/binders.js';
import { ObservableBool } from 'utils/observable.js';
import { EditTaskForm } from 'components/dash/task-edit-form.js';
import { getDaysUntilDeadline } from 'utils/dates.js';

function TaskPanel(task) {

    const showModal = new ObservableBool(false);

    const onclick = (e) => {
        showModal.true()
    }

    return (
        element('div', {
            className: 'task-panel'
        },
            EditTaskForm(task, showModal),
            element('input', {
                className: 'checkbox',
                type: 'checkbox' 
            }),
            element('div', {
                className: 'task-title-parent',
                onclick
            },
                element('div', {
                    className: 'text task-title',
                    textContent: task.title
                })
            ),
            element('div', {
                className: 'days',
                style: {visibility: task.dueDate ? 'visible' : 'hidden'}
            },
                element('div', {
                    className: 'days-number',
                    textContent: getDaysUntilDeadline(task.dueDate || '')
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
        element('div', {},

            element('div', {
                className: 'dash-list',
                bind: [[collections.tasks, repeatWith(TaskPanel)]]
            })
        )
    )
}
