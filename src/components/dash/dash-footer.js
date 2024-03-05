import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { ObservableVar, ObservableBool } from 'utils/observable.js';
import { getTypeFromSelection, getDomainIdFromSelection } from 'utils/parse.js';

export function BigSelect(selection, showBigSelect) {

    const select = (e) => {
        selection.set(e.target.getAttribute('data-value'));
        showBigSelect.false();
    }

    const doNothing = () => {}

    const show = (el, value) => {
        el.style.display = value ? 'block' : 'none';
    }

    const Option = (subclass, dataValue, text, onclick) => {
        return (
            element('div', { 
                className: `menu-option ${subclass}`, 
                'data-value': dataValue, 
                textContent: text,
                onclick
            })
        );
    }
    
    return (
        element('div', {
            className: 'menu',
            bind: [[showBigSelect, show]]
        },
            bind(collections.domains, (domains) => 
                element('div', {},
                    Option('main', 'all-domains', 'Categories', select),
                    // Option('main', 'all-items', 'Items', doNothing),
                    Option('main', 'all-tasks', 'Tasks', select),
                    Option('main', 'all-events', 'Events', select),
                    element('div', {},
                        Option('main', 'none-all', 'Uncategorized', doNothing),
                        // Option('sub', 'none-items', 'Items', doNothing),
                        Option('sub', 'none-tasks', 'Tasks', select),
                        Option('sub', 'none-events', 'Events', select)
                    ),
                    repeat(collections.domains.value, (domain) => 
                        element('div', {},
                            Option('main', `${domain._id}-all`, `${domain.title}`, doNothing),
                            // Option('sub', `${domain._id}-items`, 'Items', doNothing),
                            Option('sub', `${domain._id}-tasks`, 'Tasks', select),
                            Option('sub', `${domain._id}-events`, 'Events', select)
                        )
                    )
                )
            )
        )  
    )
}

export function SelectionDisplay(selection, showBigSelect) {

    const onclick = () => {
        showBigSelect.toggle();
    }

    const styleInput = (el, value) => {
        el.style.border = value
        ? '2px solid #00C9A7'
        : '1px solid #ccc';
    }

    const getLeftSideTxt = (value) => {
        const [domain, type] = value?.split('-');
        if (!value) {
            return '';
        }
        if (domain === 'all') {
            return '';
        }
        if (domain === 'none') {
            return 'Uncategorized';
        }
        return collections.domains.findById(domain)?.title;
    }

    const getRightSideTxt = (value) => {
        const [domain, type] = value?.split('-');
        if (!value) {
            return '';
        }
        if (type === 'all') {
            return '';
        }
        if (type === 'items') {
            return 'Items';
        }
        if (type === 'tasks') {
            return 'Tasks';
        }
        if (type === 'events') {
            return 'Events';
        }
        if (type === 'domains') {
            return 'Categories';
        }
    }

    return (
        element('div', {
            className: 'input selectionDisplay',
            bind: [[showBigSelect, styleInput]],
            onclick
        },
            bind(selection, (value) =>
                element('div', {},
                    element('span', {
                        textContent: getLeftSideTxt(value)
                    }),
                    element('span', {
                        textContent: ', ', 
                        style: {
                            display: getLeftSideTxt(value) ? 'inline' : 'none'
                        }
                    }),
                    element('span', {
                        textContent: getRightSideTxt(value)
                    })
                )
            )
        )
    )
}

export function TitleInput(selection) {

    let form;

    if (selection === 'none-all' || !selection.value) {
        return;
    }
    
    const onclick = () => {
       
        if (!selection.value) {
            return;
        }
        const [domain, type] = selection.value.split('-');
        let data = {title: form.elements.title.value};
        if (type === 'all') {
            return;
        }
        if (!type === 'domains') {
            data.domainId = domain;
        }
        
        if (form.reportValidity()) {
            collections[type]
            .create(data).then(() => form.reset())
        }
    }

    return (
        element('div', {className: 'title-input'},
            form = element('form', {},
                element('textarea', {
                    rows: 2,
                    name: 'title',
                    required: true
                }),
            ),
            element('button', {
                textContent: 'Add',
                onclick
            })
        )
    )
}

export function DashFooter(selection) {

    const showBigSelect = new ObservableBool(false);
    
    return (
        element('div', {className: 'dash-footer'}, 
            BigSelect(selection, showBigSelect),
            SelectionDisplay(selection, showBigSelect),
            TitleInput(selection)
        )
    )
}
