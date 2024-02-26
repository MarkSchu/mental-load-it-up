import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { getRandomColor } from 'utils/colors.js';

export function DomainSelect(domainSelection) {
    
    const setDomain = (e) => {
        domainSelection.set(e.target.value);
    }

    const displayDomain = (el, value) => {
        if (value === 'all') {
            el.textContent = '> All';
        } else if (value === 'none') {
            el.textContent = 'None';
        } else {
            const domain = collections.domains.findById(value);
            el.textContent = `${domain.title}`;
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
        try {
            if (form.reportValidity()) {
                const data = {title: form.elements.title.value};
                if (mainSelection.value === 'domains') {
                    data.color = getRandomColor();
                }
                collections[mainSelection.value]
                .create(data)
                .then(() => form.reset())
            }
        } catch(err) {
            console.log(err)
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
            // element('div', {
            //     className: 'main-option',
            //     textContent: 'Tags',
            //     'data-value': 'domains',
            //     bind: [[mainSelection, showSelection]],
            //     onclick
            // })
        )
    )
}

export function Attributes() {
    return (
        element('div', {},
            element('div', {},

            )
        )
    )
}

/*

    > Need to Grab

    [] Task   [] Event  [] Any 
    
    date  dd/mm/yyy  |  recurs every [] 


    ---


    upcoming events 
    what were out opf 
*/

export function Dateinput() {

    
    
    return (
        element('div', {className: 'input'},
            element('input', {name: 'date', style: {display: 'none'}}),
            element('div', {})
        )
    )
}

export function DashFooter(mainSelection, domainSelection) {


    return (
        element('div', {className: 'dash-footer'}, 
            TextInput(mainSelection, domainSelection),
            // DomainSelect(domainSelection),
            // MainSelection(mainSelection)
            DomainSelect(domainSelection),
            element('div', {className: 'foo input'}, 
                element('div', {},
                    element('input', {type: 'radio'}),
                    element('span', {textContent: 'Task'})
                ),
                element('div', {},
                    element('input', {type: 'radio'}),
                    element('span', {textContent: 'Event'})
                ),
                element('div', {},
                    element('input', {type: 'radio'}),
                    element('span', {textContent: 'Neither'})
                )
            ),
            element('div', {},
                element('div', {className: 'datewrapper'},
                    // element('input', {
                    //     className: 'datebutton',
                    //     type: 'date', 
                    //     name: 'dueDate',
                    //     onclick: () => { console.log('ok'); }
                    // }),
                    element('div', {
                        className: 'datedisplay',
                        textContent: 'Set Date'
                    }),
                    element('input', {
                        className: 'datebutton',
                        type: 'date', 
                        name: 'dueDate',
                        onclick: (e) => { e.target.showPicker() }
                    }),
                )
            )
        )
    )
}