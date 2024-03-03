import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { ObservableVar, ObservableBool } from 'utils/observable.js';
import { getTypeFromSelection, getDomainIdFromSelection } from 'utils/parse.js';

const names = {
    tags: 'Tags',
    items: 'Items',
    tasks: 'Tasks',
    events: 'Events',
    all: 'All',
    none: 'Uncategorized'
};

export function BigSelect(selection, showBigSelect) {

    const onclick = (e) => {
        selection.set(e.target.getAttribute('data-value'));
        showBigSelect.false();
    }

    const show = (el, value) => {
        el.style.display = value ? 'block' : 'none';
    }

    const Option = (subclass, dataValue, text,) => {
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
                element('div', {className: 'foo'},
                    Option('main', 'all-domains', 'Categories'),
                    Option('main', 'all-items', 'Items'),
                    Option('main', 'all-tasks', 'Tasks'),
                    Option('main', 'all-events', 'Events'),
                    element('div', {},
                        Option('main', 'none-all', 'Uncategorized'),
                        Option('sub', 'none-items', 'Items'),
                        Option('sub', 'none-tasks', 'Tasks'),
                        Option('sub', 'none-events', 'Events')
                    ),
                    repeat(collections.domains.value, (domain) => 
                        element('div', {},
                            Option('main', `${domain._id}-all`, `${domain.title}`),
                            Option('sub', `${domain._id}-items`, 'Items'),
                            Option('sub', `${domain._id}-tasks`, 'Tasks'),
                            Option('sub', `${domain._id}-events`, 'Events')
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

    const onclick = () => {
        if (form.reportValidity()) {
            const type = getTypeFromSelection(selection);
            collections[type]
            .create({
                title: form.elements.title.value,
                domainId: getDomainIdFromSelection(selection)
            })
            .then(() => form.reset())
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


// element('ol', {},
//     element('li', {},
//         element('li', {
//             textContent: 'Tasks',
//             'data-value': 'all-tasks',
//             onclick
//         }),
//         element('li', {
//             textContent: 'Events',
//             'data-value': 'all-events',
//             onclick
//         })
//     ),
    
//     element('li', {
//         textContent: 'Not Categorized'},
//         element('ol', {},
//             element('li', {
//                 textContent: 'Tasks', 
//                 'data-value': 'none-tasks',
//                 onclick
//             }),
//             element('li', {
//                 textContent: 'Events', 
//                 'data-value': 'none-events',
//                 onclick
//             }),
//         )
//     ),
//     repeat(collections.domains.value, (domain) => 
//         element('li', {
//             textContent: domain.title,
//             'data-value': `${domain._id}-all`,
//             onclick
//         },
//             element('ol', {},
//                 element('li', {
//                     textContent: 'Tasks', 
//                     'data-value': `${domain._id}-tasks`,
//                     onclick
//                 }),
//                 element('li', {
//                     textContent: 'Events', 
//                     'data-value': `${domain._id}-events`,
//                     onclick
//                 }),
//             )
//         )
//     )   
// )