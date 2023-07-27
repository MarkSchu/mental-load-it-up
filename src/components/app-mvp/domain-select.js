import { element } from 'utils/dom.js';
import state from 'data/state.js';
import { repeatWith } from 'utils/binders.js';

export const DomainSelect = (domainId) => {
    return (
        element('select', {
            name: 'domainId',
            bind: [[state.domains, repeatWith((domain) => 
                element('option', {
                    value: domain._id,
                    textContent: domain.name,
                    selected: domain._id === domainId
                })
            )]],
        })
    )
}

