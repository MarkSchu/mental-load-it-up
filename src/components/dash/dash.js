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
                    textContent: 'Account / '
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
                element('select', {className: 'select'},
                    element('option', {textContent: 'Tasks'}),
                    element('option', {textContent: 'Events'})
                ),
                element('select', {className: 'filter'},
                    element('option', {textContent: 'home'}),
                ),
                element('span', {className: 'details'},
                    element('span', {textContent: 'details'}),
                    element('input', {type: 'checkbox'})
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

