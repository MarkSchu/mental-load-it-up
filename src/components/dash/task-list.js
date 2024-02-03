import { element } from 'utils/dom.js';
import { collections } from 'data/collection.js';
import { repeatWith } from 'utils/binders.js';
import { Task1 } from 'components/dash/task1.js';

export function TaskList () {
    return (
        element('div', {},
            element('div', {
                className: 'dash-list',
                bind: [[collections.tasks, repeatWith(Task1)]]
            })
        )
    )
}
