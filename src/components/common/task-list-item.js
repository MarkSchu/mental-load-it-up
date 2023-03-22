import { element } from 'utils/dom.js';
import { getDaysUntil } from 'utils/dates.js';

export function TaskListItem(instance) {
    return (
        element('div', {className: 'task-list-item'},
            element('div', {className: 'col info-col'},
                element('div', {className: 'task-title', textContent: `${instance.name}`}),
            ),
            element('div', {className: 'col days-col'},
                element('div', {textContent: getDaysUntil(instance.dueDate)}),
                element('div', {textContent: 'Days Left'}),
            ),
            element('div', {className: 'col done-col'},
                element('button', {textContent: 'Done'})
            ),
        )
    )
}