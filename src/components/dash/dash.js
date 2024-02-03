import { element } from 'utils/dom.js';
import { collections } from 'data/collection.js';
import { disableOnRequest } from 'utils/binders.js';
import { alerts } from 'data/alerts.js';
import { TaskList } from 'components/dash/task-list.js';

// function DashHeader() {
//     return (
        
//     )
// }

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
            element('form', {
                className: ' task-input-form',
                onsubmit
            },
                element('input', {
                    className: 'input task-input',
                    type: 'text',
                    name: 'title',
                    required: true
                }),
                element('button', {
                    className: 'button button-primary create-button',
                    textContent: 'Add',
                    bind: [[alerts, disableOnRequest]]
                })
            ),
            element('div', {}, 
                element('select', {className: 'select button-secondary select-button'},
                    element('option', {textContent: 'Tasks'}),
                    element('option', {textContent: 'Tasks & Events'}),
                    element('option', {textContent: 'Events'}),
                    element('option', {textContent: 'Domains'}),
                    element('option', {textContent: 'Meal Plan'})
                )
            ),
            element('div', {}, 
                element('select', {className: 'select button-secondary select-button'},
                    element('option', {textContent: 'home'}),
                    element('option', {textContent: 'groceries'}),
                    element('option', {textContent: 'budget'}),
                    element('option', {textContent: 'travel'}),
                )
            )
        )
    )
}

export function Dash() {
    return (
        element('div', {className: 'dash'},
            // DashHeader(),
            TaskList(),
            // DashFooter()
        )
    )
}

