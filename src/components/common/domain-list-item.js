import { element } from 'utils/dom.js';
import { getDaysUntil } from 'utils/dates.js';
import state from 'data/state.js';

export function DomainListItem(event) {

    return (
        element('div', {className: 'list-item domains'},
            element('div', {className: 'col info-col'},
                element('div', {className: 'event-title', textContent: `${event.name}`}),
            ),
            element('div', {className: 'col done-col'},
                element('button', {
                    textContent: 'Delete',
                    onclick: () => {}
                })
            )
        )
    )
}
