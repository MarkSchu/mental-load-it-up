import { element } from 'utils/dom.js';
import { TaskList } from 'components/common/task-list.js';
import { AppHeader } from 'components/common/app-header.js';

export function Dash() {
    return (
        element('div', {className: 'dash'},
            AppHeader(),
            element('h2', {textContent: 'User'}),
            element('select', {},
                element('option', {textContent: 'Mark'}),
                element('option', {textContent: 'Heather'}),
                element('option', {textContent: 'New User'})
            ),
            element('h2', {textContent: 'Tasks'}),
            TaskList()
        )
    )
}