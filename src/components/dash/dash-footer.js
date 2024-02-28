import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { ObservableVar, ObservableBool } from 'utils/observable.js';

const names = {
    tags: 'Tags',
    tasks: 'Tasks',
    events: 'Events',
    all: 'All',
    none: 'Uncategorized'
};

const parseSelection = (selection) => {
    const [firstChoice, collection] = selection.value.split('-');
    const domainId = (firstChoice === 'all' || firstChoice === 'none') ? ''  : firstChoice;
    return [ domainId, collection];
}

export function TitleInput(selection) {

    let form;

    const onclick = (e) => {
        const [domain, collection] = parseSelection(selection);
        const data = {
            title: form.elements.title.value,
            domain
        };
        if (form.reportValidity()) {
            collections[collection]
            .create(data)
            .then(() => form.reset())
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

export function BigSelect(showBigSelect, selection) {

    const onclick = (e) => {
        selection.set(e.target.getAttribute('data-value'));
        showBigSelect.false();
    }

    const show = (el, value) => {
        el.style.display = value ? 'block' : 'none';
    }
    
    return (
        element('div', {
            className: 'menu',
            bind: [[showBigSelect, show]]
        },
            bind(collections.domains, (domains) => 
                element('ol', {},
                    element('li', {
                        textContent: 'All'},
                        element('ol', {},
                            element('li', {
                                textContent: 'Tasks',
                                'data-value': 'all-tasks',
                                onclick
                            }),
                            element('li', {
                                textContent: 'Events',
                                'data-value': 'all-events',
                                onclick
                            }),
                        )
                    ),
                    element('li', {
                        textContent: 'Uncategorized'},
                        element('ol', {},
                            element('li', {
                                textContent: 'Tasks', 
                                'data-value': 'none-tasks',
                                onclick
                            }),
                            element('li', {
                                textContent: 'Events', 
                                'data-value': 'none-events',
                                onclick
                            }),
                        )
                    ),
                    repeat(collections.domains.value, (domain) => 
                        element('li', {
                            textContent: domain.title},
                            element('ol', {},
                                element('li', {
                                    textContent: 'Tasks', 
                                    'data-value': `${domain._id}-tasks`,
                                    onclick
                                }),
                                element('li', {
                                    textContent: 'Events', 
                                    'data-value': `${domain._id}-events`,
                                    onclick
                                }),
                            )
                        )
                    )   
                )
            )
        )  
    )
}

export function SelectionDisplay(showBigSelect, selection) {

    const onclick = () => {
        showBigSelect.true();
    }

    const displaySelection = (el, value) => {
        const [firstChoice, secondChoice] = value.split('-');
        if (secondChoice === 'domains') {
            el.textContent = 'Tags';
        }
        else if (firstChoice === 'all') {
            el.textContent = `${names[secondChoice]}`;
        } 
        else if (firstChoice === 'none') {
            el.textContent = `Uncategorized, ${names[secondChoice]}`;
        } 
        else {
            const domain = collections.domains.findById(firstChoice);
            el.textContent = `${domain.title}, ${names[secondChoice]}`;
        }
    }

    return (
        element('div', {
            className: 'input selectionDisplay',
            onclick,
            bind: [[selection, displaySelection]]
        })
    )
}

export function DashFooter(selection) {

    const showBigSelect = new ObservableBool(false);
    
    return (
        element('div', {className: 'dash-footer'}, 
            BigSelect(showBigSelect, selection),
            SelectionDisplay(showBigSelect, selection),
            TitleInput(selection)
        )
    )
}
