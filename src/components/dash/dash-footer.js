import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { ObservableVar, ObservableBool } from 'utils/observable.js';
import { getTypeFromSelection, getDomainIdFromSelection } from 'utils/parse.js';

/**
 * Domains
 * Items
 * Tasks
 * Events
 * 
 * Not Categorized Items
 * Not Categorized Tasks
 * Not Categorized Events
 * 
 * House Items
 * House Tasks
 * House Events
 */

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
    
    return (
        element('div', {
            className: 'menu',
            bind: [[showBigSelect, show]]
        },
            // bind(collections.domains, (domains) => 
            //     element('table', {},
            //         repeat(collections.domains.value, (domain) => 
            //             element('div', {textContent: `${domain.title}`})
            //         )
            //     )
            // ),
            bind(collections.domains, (domains) => 
                element('div', {className: 'foo'},
                    element('div', { className: 'menu-option main', textContent: `Items` }),
                    element('div', { className: 'menu-option main', textContent: `Tasks` }),
                    element('div', { className: 'menu-option main', textContent: `Events` }),
                    element('div', {},
                        element('div', {className: 'menu-option main', textContent: `Uncategorized`}),
                        element('div', {className: 'menu-option sub', textContent: `Items`}),
                        element('div', {className: 'menu-option sub', textContent: `Tasks`}),
                        element('div', {className: 'menu-option sub', textContent: `Events`})
                    ),
                    repeat(collections.domains.value, (domain) => 
                        element('div', {},
                            element('div', {className: 'menu-option main', textContent: `${domain.title}`}),
                            element('div', {className: 'menu-option sub', textContent: `Items`}),
                            element('div', {className: 'menu-option sub', textContent: `Tasks`}),
                            element('div', {className: 'menu-option sub', textContent: `Events`})
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
        if (!value) {
            return '';
        }
        const [domainId, type] = value.split('-');

        if (type === 'domains') {
            return names['domains'];
        }
        if (domainId === 'all' || domainId === 'none') {
           return '';
        }
        return collections.domains.findById(domainId)?.title;
    }

    const getRightSideTxt = (value) => {
        if (!value) {
            return '';
        }
        const [_, type] = value.split('-');
        if (type === 'domains') {
            return ''; 
        }
        return names[type];
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