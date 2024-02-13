import { element, bind } from 'utils/dom.js';
import { collections } from 'data/collection.js';
import { repeatWith } from 'utils/binders.js';
import { Task } from 'components/dash/task.js';
import { Domain } from 'components/dash/domain.js';

export function TaskList () {
    return (
        element('div', {
            className: 'dash-list',
            bind: [[collections.tasks, repeatWith(Task)]]
        })
    )
}

export function EventList () {
    return (
        element('div', {
            className: 'dash-list',
            bind: [[collections.events, repeatWith(EventItem)]]
        })
    )
}

export function DomainList () {
    return (
        element('div', {
            className: 'dash-list',
            bind: [[collections.domains, repeatWith(Domain)]]
        })
    )
}

export function DashList (menuOption) {
    return (
        element('div', {},
            bind(menuOption, (value) => {
                if (value === 'tasks') {
                    return TaskList();
                }
                if (value === 'events') {
                    return EventList();
                }
                if (value === 'domains') {
                    return DomainList();
                }
            })
        )
    )
}

