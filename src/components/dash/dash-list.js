import { element, repeat } from 'utils/dom.js';
import { bind, listen } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { repeatWith } from 'utils/binders.js';
import { TaskItem } from 'components/dash/task-item.js';
import { DomainItem } from 'components/dash/domain-item.js';
import { EventItem } from 'components/dash/event-item.js';
import { initLoadComplete } from 'state/general.js';


const filterByDomain = (list, domain) => {
    if (domain === 'all') {
        return list;
    } 
    else if (domain === 'none' ) {
        return list.filter(item => !item.domain);
    } 
    else {
        return list.filter(item => item.domain === domain);
    }
}

const sortAlphabetically = (list) => {
    return list.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });
}

export function TaskList (domainSelection) {
    return (
        bind(collections.tasks, (tasks) => 
            bind(domainSelection, (domain) => {
                const filteredTasks = filterByDomain(tasks, domain);
                return (
                    element('div', {},
                        repeat(filteredTasks, TaskItem)
                    )
                )
            })
        )
    )
}

export function EventList (domainSelection) {
    return (
        bind(collections.events, (events) => 
            bind(domainSelection, (domain) => {
                const filteredEvents = filterByDomain(events, domain);
                return (
                    element('div', {},
                        repeat(filteredEvents, EventItem)
                    )
                )
            })
        )
    )
}

export function DomainList (domainSelection) {
    return (
        bind(collections.domains, (domains) =>
            element('div', {},
                repeat(sortAlphabetically(domains), DomainItem)
            )
        )
    )
}

export function DashList (mainSelection, domainSelection) {
    return (
        element('div', {className: 'dash-list'},
            listen(initLoadComplete, () => 
                bind(mainSelection, (value) => {
                    if (value === 'tasks') {
                        return TaskList(domainSelection);
                    }
                    if (value === 'events') {
                        return EventList(domainSelection);
                    }
                    if (value === 'domains') {
                        return DomainList(domainSelection);
                    }
                })
            )
        )
    )
}

