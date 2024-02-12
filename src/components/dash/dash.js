import { element, bind } from 'utils/dom.js';
import { collections } from 'data/collection.js';
import { DashList } from 'components/dash/task-list.js';
import { user } from 'data/user.js';
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

function DashFooter (menuOption) {

    let form;

    const createTake = () => {
        if (form.reportValidity()) {
            collections.tasks
            .create({title: form.elements.title.value})
            .then(() => form.reset())
        }
    }

    const displayCount = (el, list) => {
        el.textContent = `Tasks (${list.length})`;
    }

    const setMenuOption = (e) => {
        menuOption.set(e.target.value);
    }

    const displayMenuOption = (collectionName) => (el, list) => {
        el.textContent = `${collectionNames[collectionName]} (${list.length})`;
    }

    return (
        element('div', {className: 'dash-footer'},
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
            element('div', {className: 'menu'},
                element('div', {className: 'select'},
                    element('select', {
                        className: 'primary-options',
                        onchange: setMenuOption
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
                    bind(menuOption, (value) =>
                        element('div', {
                            bind: [[collections[value], displayMenuOption(value)]]
                        })
                    )
                ),
                element('div', {className: 'select middle'},
                    element('select', {},
                        element('option', {textContent: 'home projects'}),
                        element('option', {textContent: 'yard work'}),
                        element('option', {textContent: 'kids school'}),
                        element('option', {textContent: 'travel'}),
                    ),
                    element('div', {textContent: 'home projects'})
                ),
                // element('div', {className: 'select'},
                //     element('div', {className: 'details'},
                //         element('div', {textContent: 'Hide Details'}),
                //     )   
                // )
            )
        )
    )
}

export function Dash() {

    const menuOption = new ObservableVar('tasks');

    return (
        element('div', {className: 'dash'},
            DashHeader(),
            DashList(menuOption),
            DashFooter(menuOption)
        )
    )
}
