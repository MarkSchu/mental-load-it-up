import { element } from 'utils/dom.js';

export function CreateMember() {
    return (
        element('div', {},
            element('button', {textContent: 'Add'})
        )
    )
}