import { element } from 'utils/dom.js';
import { collections } from 'data/collection.js';
import { disableOnRequest } from 'utils/binders.js';
import { alerts } from 'data/alerts.js';
import { TaskList } from 'components/dash/task-list.js';


function DashFooter () {

    const onsubmit = (e) => {
        const form = e.target;
        if (form.reportValidity()) {
            collections.tasks
            .create({title: 'buy a cow'})
            .then(() => form.reset())
        }
        return false;
    }

    return (
        element('div', {className: 'dash-footer'},
            element('form', {onsubmit},
                element('input', {
                    style: {
                        width: '100%',
                        marginRight: '4px'
                    },
                    className: 'input',
                    type: 'text',
                    required: true
                }),
                element('button', {
                    className: 'button button-primary',
                    textContent: 'Add',
                    bind: [[alerts, disableOnRequest]]
                })
            ),
            element('div', {}, 
                element('select', {className: 'select button-secondary select-button'},
                    element('option', {textContent: 'Tasks'})
                )
            )
        )
    )
}

export function Dash() {
    return (
        element('div', {},
            TaskList(),
            DashFooter()
        )
    )
}

