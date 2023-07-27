import { element } from 'utils/dom.js';
import state from 'data/state.js';
import { repeatWith } from 'utils/binders.js';
import { DeleteEventButton } from 'components/app-mvp/delete-event-button.js';
import { EditEventForm } from 'components/app-mvp/edit-event-form.js';

export const EventList = (parent, list) => {
    return (
        element('div', {},
            element('h2', {textContent: 'Events'}),
            element('div', {
                bind: [[state.events, repeatWith(EventListItem)]]
            })
        )
    )
}

export const EventListItem = (event) => {
    return (
        element('div', {},
            element('div', {textContent: `name: ${event.name}`}),
            element('div', {textContent: `date: ${event.date}`}),
            element('div', {textContent: `domainId: ${event.domainId}`}),
            element('div', {textContent: `teamId: ${event.teamId}`}),
            element('div', {textContent: `_id: ${event._id}`}),
            EditEventForm(event),
            DeleteEventButton(event._id),
            element('br', {})
        )
    )
}