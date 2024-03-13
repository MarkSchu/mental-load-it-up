import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { ObservableBool } from 'utils/observable.js';
import { getTypeFromSelection, getDomainIdFromSelection } from 'utils/parse.js';



export function SelectionDisplay(selection, showBigSelect) {

    const onclick = () => {
        showBigSelect.toggle();
    }

    const styleInput = (el, value) => {
        el.style.border = value
        ? '2px solid #00C9A7'
        : '1px solid #ccc';
    }

    const getText = (value) => {
        const [domainId, type] = value.split('-');
        if (domainId === 'all') {
            if (type === 'domains') {
                return 'Categories';
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
        } 
        if (domainId === 'none') {
            return 'Uncategorized';
        }
        return collections.domains.findById(domainId)?.title;
    }

    return (
        element('div', {
            className: 'input selectionDisplay',
            bind: [[showBigSelect, styleInput]],
            onclick
        },
            bind(selection, (value) => 
                element('div', {
                    textContent: getText(value)
                })
            )
        )
    )
}

export function BigSelect(selection, showBigSelect) {

    const select = (e) => {
        selection.set(e.target.getAttribute('data-value'));
        showBigSelect.false();
    }

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
                    element('hr', {}),
                    Option('main', 'all-items', 'Items', select),
                    Option('main', 'all-tasks', 'Tasks', select),
                    Option('main', 'all-events', 'Events', select),
                    element('hr', {}),
                    repeat(collections.domains.value, (domain) => 
                        Option('main', `${domain._id}-any`, `${domain.title}`, select)
                    ),
                    element('hr', {}),
                    Option('main', 'none-any', 'Uncategorized', select),
                )
            )
        )  
    )
}

export function MainInput(selection) {

    let form;

    if (selection === 'none-all' || !selection.value) {
        return;
    }
    
    const onClickAdd = () => {
       
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

    const displayTypeInput = (el, value) => {
        const domain = value.split('-')[0];
        el.style.opacity = domain === 'all' ? '0.15' : '1';
    }

    const underline = (el, value) => {
        const type = value.split('-')[1];
        el.style.textDecoration = (type === el.getAttribute('data-value')) ? 'underline' : 'none';
    }

    const select = (e) => {
        const domain = selection.value.split('-')[0];
        const type = e.target.getAttribute('data-value');
        selection.set(`${domain}-${type}`);
    }

    return (
        element('div', {},
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
                    onclick: onClickAdd
                })
            ),
            element('div', {
                className: 'type-input input', 
                bind: [[selection, displayTypeInput]]
            },
                element('div', {
                    textContent: 'Any',
                    'data-value': 'any',
                    bind: [[selection, underline]],
                    onclick: select
                }),
                element('div', {
                    textContent: 'Item',
                    'data-value': 'items',
                    bind: [[selection, underline]],
                    onclick: select
                }),
                element('div', {
                    textContent: 'Task',
                    'data-value': 'tasks',
                    bind: [[selection, underline]],
                    onclick: select
                }),
                element('div', {
                    textContent: 'Event',
                    'data-value': 'events',
                    bind: [[selection, underline]],
                    onclick: select
                }),
            )
        )
    )
}

export function DashFooter(selection, domainSelection, typeSelection) {

    const showBigSelect = new ObservableBool(false);
    // all/none/domainId-any/items/tasks/events/domains
    return (
        element('div', {className: 'dash-footer'}, 
            BigSelect(selection, showBigSelect),
            SelectionDisplay(selection, showBigSelect),
            MainInput(selection)
        )
    )
}
