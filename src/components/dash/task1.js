import { element } from 'utils/dom.js';
import { collections } from 'data/collection.js';
import { repeatWith } from 'utils/binders.js';
import { ObservableBool } from 'utils/observable.js';
import { EditTaskForm } from 'components/dash/task-edit-form.js';
import { getDaysUntilDeadline } from 'utils/dates.js';

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

export function Task1(task) {

    const domain = domains[getRandomInt(0, 4)]
    const recurring = recurrings[getRandomInt(0, 3)];
    const showModal = new ObservableBool(false);
    const onclick = (e) => showModal.true();
    // EditTaskForm(task, showModal),
    return (
        element('div', {className: 'task'},
            element('input', {
                className: 'checkbox',
                type: 'checkbox'
            }),
            element('div', {className: 'task-info'},
                element('div', {
                    className: 'task-description',
                    textContent: task.title,
                    onclick
                }),
                element('div', {className: 'sub-info'},
                    element('span', {
                        className: 'task-domain',
                        textContent: domain + ' '
                    }),
                    // element('span', {
                    //     className: 'recurring', 
                    //     textContent: recurring + ' '
                    // }),
                    element('span', {
                        className: 'task-deadline',
                        textContent: getRandomInt(0, 50) + ' days'
                    })
                )
            )
        )
    )
}
