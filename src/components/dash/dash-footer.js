import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { DashList } from 'components/dash/dash-list.js';
import { user } from 'state/user.js';
import { ObservableVar } from 'utils/observable.js';

export function DomainSelect(domainSelection) {
    
    const setDomain = (e) => {
        domainSelection.set(e.target.value);
    }

    const displayDomain = (el, value) => {
        if (value === 'all') {
            el.textContent = 'Tag: All';
        } else if (value === 'none') {
            el.textContent = 'Tag: None';
        } else {
            const domain = collections.domains.findById(value);
            el.textContent = `Tag: ${domain.title}`;
        }
    }

    return (
        element('div', { className: 'domain-selection select' },
            bind(collections.domains, (domains) => 
                element('select', {onchange: setDomain},
                    element('option', {
                        textContent: 'All', 
                        value: 'all'
                    }),
                    element('option', {
                        textContent: 'No Tag', 
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
                bind:[[domainSelection, displayDomain]]
            })
        )
    )
}

export function TextInput(mainSelection) {

    let form;

    const create = (e) => {
        if (form.reportValidity()) {
            collections[mainSelection.value]
            .create({title: form.elements.title.value})
            .then(() => form.reset())
        }
        return false;
    }

    return (
        form = element('form', {className: 'text-input'},
            element('textarea', {
                className: 'input-area',
                rows: 2,
                name: 'title',
                required: true
            }),
            element('button', {
                className: 'add-button',
                textContent: 'Add',
                onclick: create
            })
        )
    )
}

export function MainSelection(mainSelection) {

    const onclick = (e) => {
        mainSelection.set(e.target.dataset.value);
    }

    const showSelection = (el, value) => {
        el.style.fontWeight = el.dataset.value === value
            ? 'bold'
            : 'initial';
    }
    
    return (
        element('div', {className: 'main-selection'},
            element('div', {
                className: 'main-option',
                textContent: 'Tasks',
                'data-value': 'tasks',
                bind: [[mainSelection, showSelection]],
                onclick
            }),
            element('div', {
                className: 'main-option',
                textContent: 'Events',
                'data-value': 'events',
                bind: [[mainSelection, showSelection]],
                onclick
            }),
            element('div', {
                className: 'main-option',
                textContent: 'Tags',
                'data-value': 'domains',
                bind: [[mainSelection, showSelection]],
                onclick
            })
        )
    )
}

export function DashFooter(mainSelection, domainSelection) {
    return (
        element('div', {className: 'dash-footer'}, 
            DomainSelect(domainSelection),
            TextInput(mainSelection, domainSelection),
            MainSelection(mainSelection)
        )
    )
}