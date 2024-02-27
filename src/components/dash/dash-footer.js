import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { ObservableVar } from 'utils/observable.js';


export function TitleInput(title, create) {

    let form;

    const onclick = (e) => {
        if (form.reportValidity()) {
            title.set(form.elements.title.value);
            create();
        }
    }

    return (
        element('div', {className: 'title-input'},
            form = element('form', {},
                element('textarea', {
                    rows: 2,
                    name: 'title',
                    required: true
                }),
            ),
            element('button', {
                textContent: 'Add',
                onclick
            })
        )
    )
}

export function DomainSelect(domainSelection) {
    
    const setDomain = (e) => {
        domainSelection.set(e.target.value);
    }

    const displayDomain = (el, value) => {
        if (value === 'none') {
            el.textContent = 'No Tag';
        } else {
            const domain = collections.domains.findById(value);
            el.textContent = `${domain.title}`;
        }
    }

    return (
        element('div', { className: 'domain-select select' },
            bind(collections.domains, (domains) => 
                element('select', {onchange: setDomain},
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

export function TypeSelect() {
    return (
        element('div', {className: 'type-select'},
            element('div', {},
                element('input', {
                    type: 'radio',
                    name: 'domain',
                    value: 'task',
                    id: 'task'
                }),
                element('label', {
                    textContent: 'Task',
                    for: 'task'
                })
            ),
            element('div', {},
                element('input', {
                    type: 'radio',
                    name: 'domain',
                    value: 'domain',
                    id: 'domain'
                }),
                element('label', {
                    textContent: 'Event',
                    for: 'domain'
                })
            ),
            element('div', {},
                element('input', {
                    type: 'radio',
                    name: 'domain',
                    value: 'neither',
                    id: 'neither'
                }),
                element('label', {
                    textContent: 'Neither',
                    for: 'neither'
                })
            )
        )
    )
}

export function DateSelect() {
    return (
        element('div', {className: 'date-selection'},
            element('label', {textContent: 'Deadline: '}),
            element('input', {type: 'date'})
        )
    )
}

export function DashFooter(mainSelection, domainSelection) {

    const title = new ObservableVar('');
    const type = new ObservableVar('');
    const date = new ObservableVar('');

    const create = () => {
        console.log('boop')
        // collections[mainSelection.value]
        // .create(data)
        // .then(() => form.reset())
    }

    return (
        element('div', {className: 'dash-footer'}, 
            // TitleInput(title, create),
            DomainSelect(domainSelection),
            TitleInput(title, create),
            // TypeSelect(type),
            // DateSelect(date)
        )
    )
}
