import { element, boolToInlineDisplay } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { collections } from 'data/collection.js';
import { EditTaskForm } from 'components/dash/task-edit-form.js';
import { getDaysUntilDeadline } from 'utils/dates.js';




export function EventItem(event) {

    const showModal = new ObservableBool(false);

    const deleteEvent = () => {

    }

    return (
        element('div', {className: 'panel'},
            // EditEventForm(event, showModal)
            element('div', {className: 'left'},
            
            ),
            element('div', {className: 'center'},
                element('div', {className: 'title', textContent: event.title}),
                element('div', {className: 'details'}),
            ),
            element('div', {className: 'right'},
                element('span', {
                    className: 'delete',
                    textContent: '×',
                    onclick: deleteEvent
                })
            )
        )
    )
}
