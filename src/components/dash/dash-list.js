import { element, repeat, render } from 'utils/dom.js';
import { bind, listen } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { repeatWith } from 'utils/binders.js';
import { TaskItem } from 'components/dash/task-item.js';
import { Item } from 'components/dash/item.js';
import { DomainItem } from 'components/dash/domain-item.js';
import { EventItem } from 'components/dash/event-item.js';
import { initLoadComplete } from 'state/general.js'
import { sortByDates } from 'utils/dates.js';

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

export function List(value) {
    const [domain, type] = value.split('-');
    return (
        element('div', {},
            bind(collections[type], (items) => {     
                
                let filteredAndSorted;
                if (type === 'domain') {
                    filteredAndSorted = sortAlphabetically(items);
                } else {
                    filteredAndSorted = sortByDates(items);
                    if (domain !== 'all' && domain !== 'none') {
                        filteredAndSorted = filterByDomain(items, domain);
                    }
                }
                
                return (
                    element('div', {},
                        repeat(filteredAndSorted, (item) => {
                            if (item.type === 'domains') {
                                return DomainItem(item);
                            }
                            if (item.type === 'items') {
                                return Item(item);
                            }
                            if (item.type === 'tasks') {
                                return TaskItem(item);
                            }
                            if (item.type === 'events') {
                                return EventItem(item);
                            }
                            return element('div', {textContent: 'wait what'})
                        })
                    )
                )
            })
        )
    )
}

export function DashList (selection) {
    return (
        element('div', {className: 'dash-list'},
            listen(initLoadComplete, () => 
                bind(selection, (value) => 
                    List(value)
                )
            )
        )
    )
}
