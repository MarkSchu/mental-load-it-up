import { element } from 'utils/dom.js';
import state from 'data/state.js';
import { repeatWith } from 'utils/binders.js';
import { DeleteDomainButton } from 'components/app-mvp/delete-domain-button.js';
import { EditDomainForm } from 'components/app-mvp/edit-domain-form.js';

export const DomainList = (parent, list) => {
    return (
        element('div', {},
            element('h2', {textContent: 'Domains'}),
            element('div', {
                bind: [[state.domains, repeatWith(DomainListItem)]]
            })
        )
    )
}

export const DomainListItem = (domain) => {
    return (
        element('div', {},
            element('div', {textContent: `name: ${domain.name}`}),
            element('div', {textContent: `_id: ${domain._id}`}),
            element('div', {textContent: `teamId: ${domain.teamId}`}),
            EditDomainForm(domain),
            DeleteDomainButton(domain._id),
            element('br', {})
        )
    )
}
