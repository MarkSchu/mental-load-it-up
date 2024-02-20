import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { DashList } from 'components/dash/dash-list.js';
import { user } from 'state/user.js';
import { ObservableVar } from 'utils/observable.js';

export function InputControls() {
    return (
        element('div', {className: 'input-controls'},
            element('form', {className: 'form'},
                element('textarea', {
                    className: 'input',
                    rows: 2,
                    name: 'title',
                    required: true
                })
            ),
            element('div', {className: 'buttons'},
                element('button', {
                    className: 'input domain-selection',
                    textContent: 'Tag: All'
                }),
                element('button', {
                    className: 'input',
                    textContent: 'Add'
                })
            )
        )
    )
}

export function MainSelection() {
    return (
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
            })
        )
    )
}

export function DashFooter() {
    return (
        element('div', {className: 'dash-footer'}, 
            InputControls(),
            MainSelection()
        )
    )
}