import { element, boolToInlineDisplay } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { collections } from 'state/collection.js';
import { getDaysUntilDeadline } from 'utils/dates.js';


export function EventItem(event) {

    const domain = collections.domains.value.find(domain => domain._id === event.domain);
    const daysUntilDueDate = getDaysUntilDeadline(event.dueDate);
    const showDomain = !!domain;
    const showDaysUntilDueDate = !isNaN(daysUntilDueDate);
    const showDetails = showDomain || showDaysUntilDueDate;
    const showModal = new ObservableBool(false);


    const deleteEvent = () => {
        collections.events.delete(event._id);
    }

    const openEditModal = () => {
        showModal.true();
    }

    return (
        element('div', {className: 'panel event'},
            // EventEditForm(event, showModal),
            element('div', {className: 'left'}),
            element('div', {className: 'center info', onclick: openEditModal},
                element('div', {className: 'title', textContent: event.title}),
                element('div', {
                    className: 'details',
                    style: {display: showDetails ? 'initial' : 'none'}
                },
                    element('span', {
                        className: 'duedate',
                        textContent: daysUntilDueDate + ' days',
                        style: {
                            display: daysUntilDueDate ? 'initial' : 'none'
                        }
                    }),
                    element('span', {
                        className: 'domain',
                        textContent: domain?.title,
                        style: {
                            display: showDomain ? 'initial' : 'none'
                        }
                    })
                ),
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

