import { element } from 'utils/dom.js';
import { toggleModalOverlay } from 'utils/binders.js';
import { collections } from 'state/collection.js';


export function DomainEditForm(domain, showModal) {
    
    let form;
    
    const saveChanges = (e) => {
        if (form.reportValidity()) {
            collections.domains
            .update(domain._id, {
                title: form.elements.title.value
            });
        }        
        return false;
    }

    const closeForm = () => {
        showModal.false();
        return false;
    }
  
    return (
        element('div', {
            className: 'form-page overlay',
            bind: [[showModal, toggleModalOverlay]]
        },
            form = element('form', {},
                element('h1', {
                    className: 'h1',
                    textContent: 'Edit Domain'
                }),
                element('label', {
                    className: 'label',
                    textContent: 'Title'
                }),
                element('textarea', {
                    className: 'input textarea',
                    rows: 3,
                    name: 'title',
                    value: domain.title,
                    required: true
                })
            ),
            element('div', {className: 'buttons'},
                element('button', {
                    className: 'button button-secondary',
                    textContent: 'Cancel',
                    onclick: closeForm
                }),
                element('button', {
                    className: 'button button-primary',
                    textContent: 'Save',
                    onclick: saveChanges
                })
            )
        )
    )
}