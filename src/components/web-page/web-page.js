import { element } from 'utils/dom.js';

function Header() {
    return (
        element('div', {})
    )
}

function Footer() {
    return (
        element('div', {})
    )
}

function Body() {
    return (
        element('div', {},
            element('h1', {
                textContent: 'Tackle Mental Load Together'
            })
        )
    )
}

export function WebPage() {
    return (
        element('div', {},
            Body()
        )
    )
}