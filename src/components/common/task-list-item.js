import { element } from 'utils/dom.js';
import { getDaysUntil } from 'utils/dates.js';
import state from 'data/state.js';
import { TASKS } from 'data/collection-names.js';

export function TaskListItem(task) {
    const setTaskToDone = () => {
        state.tasks.updateById(task._id, {status: 'done'});
    }

    const deleteTask = () => {
        state.tasks.deleteById(task._id);
    }

    const formatDate = (dueDate) => {
        var date = new Date(dueDate);
        var dateArray = date.toDateString().split(' ');
        dateArray.shift();
        dateArray.pop();
        return dateArray.join(' ')
    }

    return (
        element('div', {className: ''},
            element('div', {},
                element('div', {
                    textContent: `${task.name}`
                }),
                element('div', {className: ''},
                    element('span', {
                        textContent: getDaysUntil(task.dueDate),
                    }),
                    element('span', {
                        textContent: getDaysUntil(task.dueDate) === 1 ? ' day' : ' days'
                    })
                )
            ), 
            element('buttons', {},
                element('button', {
                    textContent: 'Delete',
                    onclick: deleteTask
                }),
                element('button', {
                    textContent: 'Done',
                    onclick: setTaskToDone
                })
            )
        )
    )
}
