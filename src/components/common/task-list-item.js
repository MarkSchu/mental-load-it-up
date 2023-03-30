import { element } from 'utils/dom.js';
import { getDaysUntil } from 'utils/dates.js';
import state from 'data/state.js';
import { TASKS } from 'data/collection-names.js';

export function TaskListItem(task) {

    const updateTask = () => {
        state.updateById(TASKS, task.id, {status: 'done'});
    }

    const deleteTask = () => {
        state.deleteById(TASKS, task.id);
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
            element('div', {className: 'col col-info'},
                element('div', {
                    className: 'title', 
                    textContent: `${task.name}`
                }),
                element('div', {},
                    // element('button', {
                    //     className: 'foo',
                    //     textContent: 'Delete'
                    // }),
                    // element('button', {
                    //     className: 'bar',
                    //     textContent: 'Done'
                    // })
                    
                )
            ),
            // element('div', {className: 'col col-done'},
            //     element('button', {
            //         className: 'done',
            //         textContent: 'Done',
            //         onclick: updateTask
            //     })
            // ),
            element('div', {className: 'col col-days'},
                element('div', {
                    className: 'date',
                    textContent: formatDate(task.dueDate)
                }),
                element('div', {
                    className: 'days',
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


  // element('div', {className: ''},
            //     element('button', {
            //         textContent: 'Delete',
            //         onclick: deleteTask
            //     })
            // ),