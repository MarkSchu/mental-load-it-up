import { element } from 'utils/dom.js';
import { bind, listen } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { repeatWith } from 'utils/binders.js';
import { TaskItem } from 'components/dash/task-item.js';
import { DomainItem } from 'components/dash/domain-item.js';
import { EventItem } from 'components/dash/event-item.js';
import { initLoadComplete } from 'state/general.js';

export function TaskList () {
    return (
        element('div', {
            bind: [[collections.tasks, repeatWith(TaskItem)]]
        })
    )
}

export function EventList () {
    return (
        element('div', {
            bind: [[collections.events, repeatWith(EventItem)]]
        })
    )
}

export function DomainList () {
    return (
        element('div', {
            bind: [[collections.domains, repeatWith(DomainItem)]]
        })
    )
}

export function DashList (menuOption) {
    return (
        element('div', {className: 'dash-list'},
            listen(initLoadComplete, () => 
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
    )
}

