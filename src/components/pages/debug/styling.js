import {element } from 'utils/dom.js'; 

// 4, 8, 12, 16, 20, 24, 28, 32

function Inputs() {
    return (
        element('div', {},
            element('label', {
                className: 'label',
                textContent: 'Title'
            }),
            element('input', {
                className: 'input',
                value: 'Go to the grocery store'
            }),
            element('label', {
                className: 'label',
                textContent: 'Notes'
            }),
            element('textarea', {
                className: 'textarea',
                value: 'Look up rituals for the solstice'
            }),
            element('label', {
                className: 'label',
                textContent: 'Date'
            }),
            element('input', {
                className: 'input',
                type: 'date',
            }),
            element('hr', {className: 'line-break'}),
            element('div', {className: 'form-footer'},
                element('button', {
                    className: 'button',
                    textContent: 'Cancel'
                }),
                element('button', {
                    className: 'button',
                    textContent: 'Create'
                })
            )
        )
    )
}

function Headings() {
    return (
        element('div', {},
            element('h1', {textContent: 'Heading 1', className: 'h1'}),
            element('h2', {textContent: 'Heading 2', className: 'h2'}),
            element('h3', {textContent: 'Heading 3', className: 'h3'}),
            element('p', {className: 'body', textContent: 'Hello World, this is just regular old body text.'})
        )
    )
}

export function Styling() {
    return (
        element('div', {style: {padding: '16px'}},
            Headings(),
            element('br', {}),
            Inputs()
        )
    )
}