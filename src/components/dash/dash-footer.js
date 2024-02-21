import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { DashList } from 'components/dash/dash-list.js';
import { user } from 'state/user.js';
import { ObservableVar } from 'utils/observable.js';

export function DomainSelect() {
    return (
        element('button', {
            className: 'domain-selection',
            textContent: 'Tag: All'
        })
    )
}

export function TextInput() {
    return (
        element('form', {className: 'text-input'},
            element('textarea', {
                className: 'input-area',
                rows: 2,
                name: 'title',
                required: true
            }),
            element('button', {
                className: 'add-button',
                textContent: 'Add'
            })
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
            DomainSelect(),
            TextInput(),
            MainSelection()
        )
    )
}