import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { collections } from 'state/collection.js';

export function DomainSelect(task) {

    let display;

    const updateDisplay = (e) => {
        let domain = collections.domains.findById(e.target.value);
        display.textContent = domain?.title || 'None';
    }

    return (
        element('div', {className: 'select input'},
            bind(collections.domains, (domains) =>
                element('select', { 
                    name: 'domain',
                    onchange: updateDisplay
                },
                    element('option', {textContent: 'None', value: ''}),
                    repeat(domains, (domain) => 
                        element('option', {
                            selected: task.domain === domain._id,
                            textContent: domain.title,
                            value: domain._id
                        })
                    )
                ),
            ),
            display = element('div', {
                className: 'select-display',
                textContent: task.domain?.title || 'None'
            })
        )
    )
}