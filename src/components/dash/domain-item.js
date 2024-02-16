import { element, boolToInlineDisplay } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { collections } from 'state/collection.js';
import { getDaysUntilDeadline } from 'utils/dates.js';




export function DomainItem(domain) {

    const showModal = new ObservableBool(false);

    const deleteDomain = () => {

    }

    return (
        element('div', {className: 'panel'},
            // EditDomainForm(domain, showModal)
            element('div', {className: 'left'},
            
            ),
            element('div', {className: 'center'},
                element('div', {className: 'title', textContent: domain.title}),
                element('div', {className: 'details'}),
            ),
            element('div', {className: 'right'},
                element('span', {
                    className: 'delete',
                    textContent: '×',
                    onclick: deleteDomain
                })
            )
        )
    )
}
