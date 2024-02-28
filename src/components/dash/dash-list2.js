
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

export function TaskList (domainSelection) {
    return (
        element('div', {},
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
    )
}

export function EventList (domainSelection) {
    return (
        element('div', {},
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

export function xDashList (mainSelection, domainSelection) {
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

