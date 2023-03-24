import { element } from 'utils/dom.js';
import { getDaysUntil } from 'utils/dates.js';
import api from 'utils/api.js';

export function TaskListItem(task) {

    const updateTask = () => {}

    return (
        element('div', {className: 'task-list-item'},
            element('div', {className: 'col info-col'},
                element('div', {className: 'task-title', textContent: `${task.name}`}),
            ),
            element('div', {className: 'col days-col'},
                element('div', {textContent: getDaysUntil(task.dueDate)}),
                element('div', {textContent: 'Days Left'}),
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