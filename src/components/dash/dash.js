import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { DashList } from 'components/dash/dash-list.js';
import { DashFooter } from 'components/dash/dash-footer.js';
import { user } from 'state/user.js';
import { ObservableVar } from 'utils/observable.js';

const collectionNames = {
    tasks: 'Tasks',
    events: 'Events',
    domains: 'Categories',
}

function DashHeader() {

    const logout = () => {
        user.logout();
    }

    return (
        element('div', {className: 'dash-header'},
            // element('select', {className: 'select-user'},
            //     element('option', {textContent: 'Mark'})
            // ),
            element('div', {className: 'right'},
                // element('span', {
                //     className: 'account',
                //     textContent: 'Settings'
                // }),
                // element('span', {
                //     textContent: ' | '
                // }),
                element('span', {
                    className: 'logout',
                    textContent: 'Logout',
                    onclick: logout
                })
            )
        )       
    )
}

function getDomainFromId (_id) {
    return collections.domains.value.find(domain => domain._id === _id);
}

function xDashFooter (mainSelection, domainSelection) {

    let form;

    const createTake = () => {
        if (form.reportValidity()) {
            collections[mainSelection.value]
            .create({title: form.elements.title.value})
            .then(() => form.reset())
        }
    }

    const setMainSelection = (e) => {
        mainSelection.set(e.target.value);
    }
    
    const setDomainSelection = (e) => {
        domainSelection.set(e.target.value);
    }

    const displayMainSelection = (collectionName) => (el, list) => {
        el.textContent = `${collectionNames[collectionName]} (${list.length})`;
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
        element('div', {className: 'dash-footer'},

            // Add Input 
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
            ),
                
            // Main Menu
            element('div', {className: 'menu'},

                // Main Selection
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
                ),

                // Domain Selection
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
                ),
            )
        )
    )
}

export function Dash() {

    const mainSelection = new ObservableVar('tasks');
    const domainSelection = new ObservableVar('all');

    return (
        element('div', {className: 'dash'},
            DashHeader(),
            DashList(mainSelection, domainSelection),
            DashFooter(mainSelection, domainSelection)
        )
    )
}

