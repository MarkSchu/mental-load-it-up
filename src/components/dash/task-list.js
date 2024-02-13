import { element, bind } from 'utils/dom.js';
import { collections } from 'data/collection.js';
import { repeatWith } from 'utils/binders.js';
import { TaskItem } from 'components/dash/task-item.js';
import { DomainItem } from 'components/dash/domain-item.js';
import { EventItem } from 'components/dash/event-item.js';

export function TaskList () {
    return (
        element('div', {
            className: 'dash-list',
            bind: [[collections.tasks, repeatWith(TaskItem)]]
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
            bind: [[collections.domains, repeatWith(DomainItem)]]
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

