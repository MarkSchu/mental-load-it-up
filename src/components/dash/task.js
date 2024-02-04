import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const domains = [
    'home projects', 
    'travel',
    'school',
    'grocery',
    'yard work'
];

const recurrings = [
    'daily',
    'weekly', 
    'monthly',
    'yearly'
]

export function Task(task) {

    const domain = domains[getRandomInt(0, 4)]
    const recurring = recurrings[getRandomInt(0, 3)];
    const showModal = new ObservableBool(false);
    const onclick = (e) => showModal.true();
    
    return (
        element('div', {className: 'task'},
            element('input', {
                className: 'checkbox',
                type: 'checkbox'
            }),
            element('div', {className: 'info'},
                element('div', {
                    className: 'title',
                    textContent: task.title,
                    onclick
                }),
                element('span', {
                    className: 'duedate',
                    textContent: getRandomInt(0, 50) + ' days'
                }),
                element('span', {
                    className: 'recurring',
                    textContent: recurring
                }),
                element('span', {
                    className: 'domain',
                    textContent: domain
                }),
            )
        )
    )
}

// element('span', {
                    //     className: 'recurring', 
                    //     textContent: recurring + ' '
                    // }),