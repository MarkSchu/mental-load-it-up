import { element } from 'utils/dom.js';
import { collections } from 'data/collection.js';
import { TaskList } from 'components/dash/task-list.js';
import { user } from 'data/user.js';

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

function DashFooter () {

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

    return (
        element('div', {className: 'dash-footer'},
            element('div', {className: 'add-container'},
                form = element('form', {className: 'form'},
                    element('input', {
                        className: 'input',
                        placeholder: 'go grocery shopping...',
                        required: true,
                        name: 'title' 
                    })
                ),
                element('button', {
                    className: 'add',
                    textContent: 'Add',
                    onclick: createTake
                }),
            ),
            element('div', {className: 'menu'},
                element('div', {className: 'select'},
                    element('select', {disabled: true},
                        element('option', {textContent: 'Tasks'}),
                        // element('option', {textContent: 'Events'}),
                        // element('option', {textContent: 'Domains'}),
                        // element('option', {textContent: 'Meal Plan'}),
                    ),
                    element('div', {
                        textContent: 'Tasks (4)',
                        bind: [[collections.tasks, displayCount]]
                    })
                ),
                // element('div', {className: 'select middle'},
                //     element('select', {},
                //         element('option', {textContent: 'home projects'}),
                //         element('option', {textContent: 'yard work'}),
                //         element('option', {textContent: 'kids school'}),
                //         element('option', {textContent: 'travel'}),
                //     ),
                //     element('div', {textContent: 'home projects'})
                // ),
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
    return (
        element('div', {className: 'dash'},
            DashHeader(),
            TaskList(),
            DashFooter()
        )
    )
}

window.addEventListener('scroll', (e) => {
    // console.log(e.target)
})