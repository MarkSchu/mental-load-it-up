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
            element('select', {
                className: 'select'
            },
                element('option', {textContent: 'Tasks'}),
                element('option', {textContent: 'Events'})
            )
            // element('form', {
            //     className: ' form',
            //     onsubmit
            // },
            //     element('input', {
            //         className: 'input',
            //         name: 'title',
            //         type: 'text',
            //         required: true
            //     }),
            //     element('button', {
            //         className: 'create',
            //         textContent: 'Create',
            //         bind: [[alerts, disableOnRequest]]
            //     })
            // ),
            // element('div', {className: 'menu'},
            //     element('select', {
            //         className: 'select'
            //     },
            //         element('option', {textContent: 'Tasks'}),
            //         element('option', {textContent: 'Events'})
            //     ),
            //     element('select', {
            //         className: 'select',
            //         textContent: 'Filter'
            //     })
            // )
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

