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

export function Task1(task) {

    const domain = domains[getRandomInt(0, 4)]
    const showModal = new ObservableBool(false);
    const onclick = (e) => showModal.true();
    
    return (
        element('div', {className: 'task'},
            EditTaskForm(task, showModal),
            element('div', {className: 'task-a'},
                element('div', {
                    className: 'checkbox2',
                    type: 'checkbox'
                }),
                element('div', {className: 'task-b'},
                    element('div', {
                        className: 'task-title2',
                        textContent: task.title,
                        onclick
                    }),
                    element('div', {className: 'super-domain'},
                        element('span', {
                            className: 'deadline',
                            textContent: getRandomInt(0, 50) + ' days'
                        }),
                        element('span', {
                            className: 'domain',
                            textContent: domain
                        })
                    )
                )
            ),
        )
    )
}

// EditTaskForm(task, showModal),
// element('input', {
//     className: 'checkbox',
//     type: 'checkbox'
// }),
// element('div', {
//     className: 'domain',
//     textContent: domain
// }),
// element('div', {
//     className: 'task-title-parent',
//     onclick
// },
//     element('span', {
//         className: 'text task-title',
//         textContent: task.title
//     })
// )

// element('div', {
//     className: 'days',
//     style: {visibility: task.dueDate ? 'visible' : 'hidden'}
// },
//     element('div', {
//         className: 'days-number',
//         textContent: getDaysUntilDeadline(task.dueDate || '')
//     }),
//     element('div', {
//         className: 'days-word',
//         textContent: 'days'
//     })
// ),