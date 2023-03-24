import { element } from 'utils/dom.js';
import { getDaysUntil } from 'utils/dates.js';
import state from 'data/state.js';

export function EventListItem(event) {

    return (
        element('div', {className: 'list-item events'},
            element('div', {className: 'col info-col'},
                element('div', {className: 'event-title', textContent: `${event.name}`}),
            ),
            element('div', {className: 'col days-col'},
                element('div', {textContent: getDaysUntil(event.startDate)}),
            ),
            element('div', {className: 'col done-col'},
                element('button', {
                    textContent: 'Delete',
                    onclick: () => {}
                })
            ),
            element('div', {className: 'col done-col'},
                element('button', {
                    textContent: 'Done',
                    onclick: () => {}
                })
            ),
        )
    )
}
