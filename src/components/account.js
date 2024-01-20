import { element } from 'utils/dom.js';

export function Account() {
    return (
        element('div', {},
            element('h1', {textContent: 'Account'})
        )
    )
}