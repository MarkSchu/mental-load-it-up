export function CombinedInput(mainSelection, domainSelection) {

    const firstChoice = new ObservableVar('items');
    const secondChoice = new ObservableVar('items');

    const displayFirstChoice = (el, value) => {
        const names = {
            tags: 'Tags',
            items: 'All Items',
            tasks: 'All Tasks',
            events: 'All Events',
        }
        if (names[value]) {
            el.textContent = names[value];
        } else {
            const domain = collections.domains.findById(value);
            el.textContent = `${domain.title} /`;
        }
    }

    const displaySecondChoice = (el, value) => {
        const names = {
            items: 'Items',
            tasks: 'Tasks',
            events: 'Events',
        }
        el.textContent = names[value];
    }

    const setFirstChoice = (el) => {
        firstChoice.set(el.target.value);
    }

    const setSecondChoice = (el) => {
        secondChoice.set(el.target.value);
    }

    const showSecondChoice = (el, value) => {
        el.style.display = (['tags', 'items', 'tasks', 'events'].includes(value))
        ? 'none'
        : 'block'
    }

    return (
        element('div', {className: 'combinedInput'},

            // First Choice
            element('div', {className: 'select'},
                bind(collections.domains, (domains) => 
                    element('select', {onchange: setFirstChoice},
                        element('option', {textContent: 'Tags', value: 'tags' }),
                        element('option', {textContent: 'All Items', value: 'items', selected: true }),
                        element('option', {textContent: 'All Tasks', value: 'tasks' }),
                        element('option', {textContent: 'All Events', value: 'events' }),
                        repeat(domains, (domain) => 
                            element('option', { textContent: domain.title, value: domain._id })
                        )
                    )
                ),
                element('div', {
                    className: 'firstChoice',
                    bind: [[firstChoice, displayFirstChoice]]
                })
            ),

            // Second Choice
            element('div', {
                className: 'select',
                bind: [[firstChoice, showSecondChoice]]
            },
                element('select', {onchange: setSecondChoice},
                    element('option', {textContent: 'Items', value: 'items', selected: true }),
                    element('option', {textContent: 'Tasks', value: 'tasks' }),
                    element('option', {textContent: 'Events', value: 'events' })
                ),
                element('div', {
                    className: 'secondChoice',
                    bind: [[secondChoice, displaySecondChoice]]
                })
            )
        )
    )
}