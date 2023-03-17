import { element } from 'utils/dom.js';

// from year-day-month to Date
const convertToDateMS = (dueDate) => {
    const list = dueDate.split('-');
    // JS is messed up here
    // you have to change the yyyy-dd-mm format to dd-mm-yyyy
    // of new Date will be a day off. Weird.
    const date = new Date(`${list[1]}-${list[2]}-${list[0]}`);
    return date.getTime();
}

const getDaysUntil = (dueDate) => {
    let dayMS = 86400000;
    let dueDateMS = convertToDateMS(dueDate);
    let today = new Date();
    today.setMilliseconds(0);
    today.setSeconds(0);
    today.setMinutes(0);
    today.setHours(0);
    let todayMS = today.getTime();
    return (dueDateMS - todayMS) / dayMS;
}

export function TaskListItem(instance) {
    
    return (
        element('div', {className: 'task-list-item'},
            element('div', {
                className: 'title',
                textContent: `${instance.name}`}
            ),
            element('div', {
                className: ''
            },
                // element('div', {className: 'circle'})
                element('button', {textContent: 'done!'})
            ),
            element('div', {
                className: 'days',
                textContent: getDaysUntil(instance.dueDate)
            }),
        )
    )
}