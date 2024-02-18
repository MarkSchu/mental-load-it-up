import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { collections } from 'state/collection.js';
import { DomainEditForm } from 'components/dash/domain-edit-form.js';



export function DomainItem(domain) {

    const showModal = new ObservableBool(false);

    const deleteDomain = () => {
        collections.domains.delete(domain._id);
    }

    const openEditModal = () => {
        showModal.true();
    }

    return (
        element('div', {className: 'panel'},
            DomainEditForm(domain, showModal),
            element('div', {className: 'left'}),
            element('div', {className: 'center'},
                element('div', {
                    className: 'title', 
                    textContent: domain.title,
                    onclick: openEditModal
                }),
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
