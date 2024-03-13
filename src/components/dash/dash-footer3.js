import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { ObservableBool } from 'utils/observable.js';
import { getTypeFromSelection, getDomainIdFromSelection } from 'utils/parse.js';

export function BigSelect(selection, showBigSelect, domainSelection, typeSelection) {

    const select = (e) => {
        selection.set(e.target.getAttribute('data-value'));
        showBigSelect.false();
    }

    const setType = (e) => {
        typeSelection.set(e.target.getAttribute('data-value'));
        showBigSelect.false();
    }

    const setDomain = (e) => {
        domainSelection.set(e.target.getAttribute('data-value'));
        showBigSelect.false();
    }

    const setSelection = (e) => {
        const value = e.target.getAttribute('data-value');
        if (value === 'domains' ||
            value === 'items' ||
            value === 'tasks' ||
            value === 'events') {
            typeSelection.set(value);
            domainSelection.set('all');
        } else {
            typeSelection.set('any');
            domainSelection.set(value);
        }
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
                    Option('main', 'domains', 'Categories', setSelection),
                    element('hr', {}),
                    Option('main', 'items', 'Items', setSelection),
                    Option('main', 'tasks', 'Tasks', setSelection),
                    Option('main', 'events', 'Events', setSelection),
                    element('hr', {}),
                    repeat(collections.domains.value, (domain) => 
                        element('div', {},
                            Option('main', `${domain._id}`, `${domain.title}`, setSelection)
                        )
                    )
                    // element('div', {},
                    //     Option('main', 'none-all', 'Uncategorized', select),
                    //     Option('sub', 'none-items', 'Items', select),
                    //     Option('sub', 'none-tasks', 'Tasks', select),
                    //     Option('sub', 'none-events', 'Events', select)
                    // ),
                    // repeat(collections.domains.value, (domain) => 
                    //     element('div', {},
                    //         Option('main', `${domain._id}-all`, `${domain.title}`, select),
                    //         Option('sub', `${domain._id}-items`, 'Items', select),
                    //         Option('sub', `${domain._id}-tasks`, 'Tasks', select),
                    //         Option('sub', `${domain._id}-events`, 'Events', select)
                    //     )
                    // )
                )
            )
        )  
    )
}

export function SelectionDisplay(selection, showBigSelect, domainSelection, typeSelection) {

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

    const getText = (type, domain) => {
        if (domain === 'all') {
            return type;
        } else {
            return collections.domains.findById(domain)?.title;
        }
    }

    return (
        element('div', {
            className: 'input selectionDisplay',
            bind: [[showBigSelect, styleInput]],
            onclick
        },
            bind(typeSelection, (type) => 
                bind(domainSelection, (domain) => 
                    element('div', {
                        textContent: getText(type, domain)
                    })
                )
            )
            // bind(selection, (value) =>
            //     element('div', {},
            //         element('span', {
            //             textContent: getLeftSideTxt(value)
            //         }),
            //         element('span', {
            //             textContent: ' ', 
            //             style: {
            //                 display: getLeftSideTxt(value) ? 'inline' : 'none'
            //             }
            //         }),
            //         element('span', {
            //             textContent: getRightSideTxt(value)
            //         })
            //     )
            // )
        )
    )
}

export function MainInput(selection, domainSelection, typeSelection) {

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

    const selectType = (e) => {
        typeSelection.set(e.target.getAttribute('data-value'));
    }

    const displaySelection = (el, value) => {
        el.style.textDecoration = (value === el.getAttribute('data-value')) ? 'underline' : 'none';
    }

    const displayTypeInput = (el, value) => {
        el.style.display = value === 'all' ? 'none' : 'flex';
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
                bind: [[domainSelection, displayTypeInput]]
            },
                element('div', {
                    textContent: 'Any',
                    'data-value': 'any',
                    bind: [[typeSelection, displaySelection]],
                    onclick: selectType
                }),
                element('div', {
                    textContent: 'Item',
                    'data-value': 'items',
                    bind: [[typeSelection, displaySelection]],
                    onclick: selectType
                }),
                element('div', {
                    textContent: 'Task',
                    'data-value': 'tasks',
                    bind: [[typeSelection, displaySelection]],
                    onclick: selectType
                }),
                element('div', {
                    textContent: 'Event',
                    'data-value': 'events',
                    bind: [[typeSelection, displaySelection]],
                    onclick: selectType
                }),
            )
        )
    )
}

export function DashFooter(selection, domainSelection, typeSelection) {

    const showBigSelect = new ObservableBool(false);
    
    return (
        element('div', {className: 'dash-footer'}, 
            BigSelect(selection, showBigSelect, domainSelection, typeSelection),
            SelectionDisplay(selection, showBigSelect, domainSelection, typeSelection),
            MainInput(selection, domainSelection, typeSelection)
        )
    )
}
