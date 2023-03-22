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
            element('div', {className: 'col info-col'},
                element('div', {className: 'task-title', textContent: `${instance.name}`}),
                element('div', {textContent: 'Due: April 5, 2023'}),
                element('div', {textContent: 'Owner: Mark'}),
                element('div', {textContent: 'Domain: Travel'}),
            ),
            element('div', {className: 'col days-col'},
                element('div', {textContent: getDaysUntil(instance.dueDate)}),
                element('div', {textContent: 'Days Left'}),
                element('div', {textContent: 'April 21'}),
            ),
            element('div', {className: 'col done-col'},
                element('button', {textContent: 'Done'})
            ),
        )
    )
}