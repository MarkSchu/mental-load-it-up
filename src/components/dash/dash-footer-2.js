import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { DashList } from 'components/dash/dash-list.js';
import { user } from 'state/user.js';
import { ObservableVar } from 'utils/observable.js';

const collectionNames = {
    tasks: 'Tasks',
    events: 'Events',
    domains: 'Categories',
}

function getDomainFromId (_id) {
    return collections.domains.value.find(domain => domain._id === _id);
}

export function AddInput(mainSelection) {

    let form;

    const createTake = () => {
        if (form.reportValidity()) {
            collections[mainSelection.value]
            .create({title: form.elements.title.value})
            .then(() => form.reset())
        }
    }

    return (
        element('div', {className: 'add-container'},
            form = element('form', {className: 'form'},
                element('textarea', {
                    className: 'add-input',
                    rows: 3,
                    name: 'title',
                    required: true
                })
            ),
            element('button', {
                className: 'add-button',
                textContent: 'Add',
                onclick: createTake
            }),
        )
    )
}

export function DomainSelection(domainSelection) {
    
    const setDomainSelection = (e) => {
        domainSelection.set(e.target.value);
    }

    const displayDomainSelection = (el, value) => {
        if (value === 'all') {
            el.textContent = 'All';
        } else if (value === 'none') {
            el.textContent = 'No Category'
        } else {
            const domain = getDomainFromId(value);
            el.textContent = domain.title;
        }
    }

    return (
            element('div', {className: 'select'},
                bind(collections.domains, (domains) => 
                    element('select', {
                        onchange: setDomainSelection
                    },
                        element('option', {
                            textContent: 'All', 
                            value: 'all'
                        }),
                        element('option', {
                            textContent: 'Uncategorized', 
                            value: 'none'
                        }),
                        repeat(domains, (domain) => 
                            element('option', {
                                textContent: domain.title,
                                value: domain._id
                            })
                        )
                    )
                ),
                element('div', {
                    bind:[[domainSelection, displayDomainSelection]]
                })
            )
    )
}

export function MainSelection(mainSelection) {

    const setMainSelection = (e) => {
        mainSelection.set(e.target.value);
    } 

    const displayMainSelection = (collectionName) => (el, list) => {
        el.textContent = `${collectionNames[collectionName]} (${list.length})`;
    }

    return (
        element('div', {className: 'select left'},
            element('select', {
                className: 'primary-options',
                onchange: setMainSelection
            },
                element('option', {
                    textContent: 'Tasks',
                    value: 'tasks'
                }),
                element('option', {
                    textContent: 'Events',
                    value: 'events'
                }),
                element('option', {
                    textContent: 'Categories',
                    value: 'domains'
                })
            ),
            bind(mainSelection, (value) =>
                element('div', {
                    bind: [[collections[value], displayMainSelection(value)]]
                })
            )
        )
    )
}

export function MainInput() {
    let form;
    return (
        element('div', {className: 'main-input'},
            form = element('form', {className: 'form'},
                element('textarea', {
                    className: 'title-input',
                    rows: 3,
                    name: 'title',
                    required: true
                })
            ),
            element('div', {className: 'buttons'},
                element('button', {
                    className: 'input domain-button',
                    textContent: 'Tag: All',
                }),
                element('button', {
                    className: 'input',
                    textContent: 'Add',
                })
            )
        )
    )
}

export function DashFooter2 (mainSelection, domainSelection) {

    let form;

    const displayMainSelection = (collectionName) => (el, list) => {
        el.textContent = `${collectionNames[collectionName]} (${list.length})`;
    }

    return (
        element('div', {className: 'dash-footer2'},    
            MainInput(),    
            element('div', {className: 'main-selection'},
                element('div', {
                    className: 'main-option',
                    textContent: 'Tasks'
                }),
                element('div', {
                    className: 'main-option',
                    textContent: 'Events'
                }),
                element('div', {
                    className: 'main-option',
                    textContent: 'Tags'
                }),
                element('div', {
                    className: 'main-option',
                    textContent: 'Meals'
                }),
            )
        )
    )
}

// const setDomainSelection = (e) => {
//     domainSelection.set(e.target.value);
// }

// const displayDomainSelection = (el, value) => {
//     if (value === 'all') {
//         el.textContent = 'All';
//     } else if (value === 'none') {
//         el.textContent = 'No Category'
//     } else {
//         const domain = getDomainFromId(value);
//         el.textContent = domain.title;
//     }
// }