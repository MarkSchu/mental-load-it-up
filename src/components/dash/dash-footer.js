import { element } from 'utils/dom.js';

export function DashFooter2() {
    return (
        element('div', {className: 'dash-footer'},
            element('div', {textContent: 'Tasks'}),
            element('div', {textContent: 'Events'}),
            element('div', {textContent: 'Tags'}),
            element('div', {textContent: 'Meals'}),
        )
    )
}