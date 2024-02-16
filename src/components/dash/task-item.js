import { element, boolToInlineDisplay } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { collections } from 'state/collection.js';
import { TaskEditForm } from 'components/dash/task-edit-form.js';
import { getDaysUntilDeadline } from 'utils/dates.js';


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const recurrings = [
    'daily',
    'weekly', 
    'monthly',
    'yearly'
]


function Checkbox (task, toggleDone) {
    return (
        element('div', {className: 'checkbox'},
            element('input', {
                className: 'checkbox-input',
                type: 'checkbox',
                checked: task.complete,
                onchange: toggleDone
            }),
            element('div', {className: 'checkmark'})
        )
    )
}

function DueDate(task) {
    const daysUntil = getDaysUntilDeadline(task.dueDate);
    const displayDueDate = !isNaN(daysUntil);
    return (
        element('span', {
            className: 'duedate',
            textContent: getDaysUntilDeadline(task.dueDate) + ' days',
            style: {display: boolToInlineDisplay(displayDueDate)}
        })
    )
}

function Domain(task) {
    const domains = collections.domains.value;
    const domain = domains.find(domain => domain._id === task.domain);
    return (
        element('span', {
            className: 'domain',
            textContent: domain?.title
        })
    )
}

export function TaskItem(task) {
    
    // const recurring = recurrings[getRandomInt(0, 3)];
    const showModal = new ObservableBool(false);
   
    

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
        element('div', {className: 'panel task'},
            TaskEditForm(task, showModal),
            element('div', {className: 'left'},
                Checkbox(task, toggleDone)
            ),
            element('div', {className: 'center info', onclick: openEditModal},
                element('div', {className: 'title', textContent: task.title}),
                element('div', {className: 'details'},
                    DueDate(task),
                    // element('span', {
                    //     className: 'recurring',
                    //     textContent: recurring
                    // }),
                    Domain(task)   
                ),
            ),
            element('div', {className: 'left'},
                element('span', {
                    className: 'delete',
                    textContent: '×',
                    onclick: deleteTask
                })
            )
        )
    )
}
