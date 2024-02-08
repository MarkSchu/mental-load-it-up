import { element } from 'utils/dom.js';
import { collections } from 'data/collection.js';
import { repeatWith } from 'utils/binders.js';
import { Task } from 'components/dash/task.js';

export function TaskList () {
    return (
        element('div', {
            className: 'task-list',
            bind: [[collections.tasks, repeatWith(Task)]]
        })
    )
}

/**
 * 
 * 
 * if the header/footer are absolute, then they're effectively the html tag. 
 * so touching them is basically activating them...mmmm
 */