import { element } from 'utils/dom.js';
import { collections } from 'data/collection.js';
import { disableOnRequest } from 'utils/binders.js';
import { alerts } from 'data/alerts.js';
import { TaskList } from 'components/dash/task-list.js';

function DashHeader() {
    return (
        element('div', {className: 'dash-header'},
            element('select', {className: 'select-user'},
                element('option', {textContent: 'Mark'})
            ),
            element('div', {className: 'right'},
                element('span', {
                    className: 'account',
                    textContent: 'Account'
                }),
                element('span', {
                    textContent: ' | '
                }),
                element('span', {
                    className: 'logout',
                    textContent: 'Logout'
                })
            )
        )       
    )
}

function DashFooter () {

    const onsubmit = (e) => {
        const form = e.target;
        if (form.reportValidity()) {
            collections.tasks
            .create({title: form.elements.title.value})
            .then(() => form.reset())
        }
        return false;
    }

    const foo = () => {

    }

    return (
        element('div', {className: 'dash-footer'},
            element('form', {className: 'form'},
                element('input', {className: 'input'}),
                element('button', {
                    className: 'add',
                    textContent: 'Add'
                }),
            ),
            element('div', {className: 'menu'},
                element('div', {className: 'select'},
                    element('select', {},
                        element('option', {textContent: 'Tasks'}),
                        element('option', {textContent: 'Events'}),
                        element('option', {textContent: 'Domains'}),
                        element('option', {textContent: 'Meal Plan'}),
                    ),
                    element('div', {textContent: 'Tasks'})
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
                element('div', {className: 'select'},
                    element('div', {className: 'details'},
                        element('div', {textContent: 'Hide Details'}),
                    )   
                )
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

