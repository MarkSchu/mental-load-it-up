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
        element('div', {className: 'list-item tasks'},
            element('div', {className: 'left'},
                element('div', {
                    className: 'title',
                    textContent: `${task.name}`
                }),
                element('div', {className: 'bottom'},
                    element('button', {
                        className: 'delete',
                        textContent: 'Delete',
                        onclick: deleteTask
                    }),
                    element('button', {
                        className: 'done',
                        textContent: 'Done',
                        onclick: setTaskToDone
                    }),
                )
            ),
            element('div', {className: 'days right'},
                
                element('div', {
                    className: 'number',
                    textContent: getDaysUntil(task.dueDate),
                }),
                element('div', {
                    className: 'label',
                    textContent: getDaysUntil(task.dueDate) === 1 ? 'day' : 'days'
                })
            )
        )
    )
}
