import { element, repeat, render } from 'utils/dom.js';
import { bind, listen } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { repeatWith } from 'utils/binders.js';
import { TaskItem } from 'components/dash/task-item.js';
import { Item } from 'components/dash/item.js';
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

export function ItemList () {
    return (
        element('div', {},
            bind(collections.items, (items) => {
                const filteredItems = filterByDomain(items, domain);
                return (
                    element('div', {},
                        repeat(filteredItems, Item)
                    )
                )
            })
        )
    )
}

export function TaskList (domain) {
    return (
        element('div', {},
            bind(collections.tasks, (tasks) => {
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

export function EventList (domain) {
    return (
        element('div', {},
            bind(collections.events, (events) => {
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

export function DomainList () {
    return (
        element('div', {},
            bind(collections.domains, (domains) =>
                element('div', {},
                    repeat(sortAlphabetically(domains), DomainItem)
                )
            )
        )
    )
}

export function DashList (selection) {
    return (
        element('div', {className: 'dash-list'},
            listen(initLoadComplete, () => 
                bind(selection, (value) => {
                    const [domain, type] = value.split('-');

                    if (type === 'items') {
                        return ItemList(domain);
                    }
                    if (type === 'tasks') {
                        return TaskList(domain);
                    }
                    if (type === 'events') {
                        return EventList(domain);
                    }
                    if (type === 'domains') {
                        return DomainList();
                    }
                    if (type === 'all') {
                        return (
                            element('div', {textContent: `Show everything for domain ${domain}`})
                        )
                    }
                })
            )
        )
    )
}
