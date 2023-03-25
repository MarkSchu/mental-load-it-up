import { element } from 'utils/dom.js';
import { getDaysUntil } from 'utils/dates.js';
import state from 'data/state.js';
import { TASKS } from 'data/collection-names.js';

export function TaskListItem(task) {

    const updateTask = () => {
        state.updateById(TASKS, task.id, {status: 'done'});
    }

    const deleteTask = () => {
        state.deleteById(TASKS, task.id);
    }

    return (
        element('div', {className: 'list-item tasks'},
            element('div', {className: 'col info-col'},
                element('div', {className: 'task-title', textContent: `${task.name}`}),
            ),
            element('div', {className: 'col days-col'},
                element('div', {
                    textContent: getDaysUntil(task.dueDate),
                    // onclick: editField()
                }),
            ),
            element('div', {className: 'col done-col'},
                element('button', {
                    textContent: 'Delete',
                    onclick: deleteTask
                })
            ),
            element('div', {className: 'col done-col'},
                element('button', {
                    textContent: 'Done',
                    onclick: updateTask
                })
            ),
        )
    )
}
