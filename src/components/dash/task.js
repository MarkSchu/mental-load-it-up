import { element, boolToInlineDisplay } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { collections } from 'data/collection.js';
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



export function Task(task) {

    const domain = domains[getRandomInt(0, 4)]
    const recurring = recurrings[getRandomInt(0, 3)];

    const showModal = new ObservableBool(false);
    const daysUntil = getDaysUntilDeadline(task.dueDate);
    const displayDueDate = !isNaN(daysUntil);
    

    const toggleDone = () => {
        collections.tasks.update(task._id, {
            complete: !task.complete
        });
    }

    const deleteTask = () => {
        collections.tasks.delete(task._id);
    }

    const openEditModal = () => {
        showModal.true();
    }

    return (
        element('div', {className: 'task'},
            EditTaskForm(task, showModal),
            element('div', {className: 'checkbox'},
                element('input', {
                    className: 'checkbox-input',
                    type: 'checkbox',
                    checked: task.complete,
                    onchange: toggleDone
                }),
                element('div', {
                    className: 'checkmark'
                })
            ),
            element('div', {
                className: 'info', 
                onclick: openEditModal
            },
                element('div', {
                    className: 'title',
                    textContent: task.title,
                    onclick
                }),
                element('div', {className: 'details'},
                    element('span', {
                        className: 'duedate',
                        textContent: getDaysUntilDeadline(task.dueDate) + ' days',
                        style: {display: boolToInlineDisplay(displayDueDate)}
                    }),
                    // element('span', {
                    //     className: 'recurring',
                    //     textContent: recurring
                    // }),
                    // element('span', {
                    //     className: 'domain',
                    //     textContent: domain
                    // })
                )
            ),
            element('span', {
                className: 'delete',
                textContent: '×',
                onclick: deleteTask
            })
        )
    )
}
