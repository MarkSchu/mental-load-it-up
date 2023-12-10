import { element } from 'utils/dom.js';

export function AppHeader() {
    return (
        element('div', {className: 'app-header'},
            element('div', {textContent: 'Mental Load it Up'}),
            element('div', {},
                element('a', {textContent: 'Account'}),
                element('span', {textContent: ' '}),
                element('a', {textContent: 'Logout'})
            )
        )
    )
}