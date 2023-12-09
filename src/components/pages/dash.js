import { element } from 'utils/dom.js';
import { CreateTaskForm } from 'components/common/create-task-form.js';
import { TaskList } from 'components/common/task-list.js';

function Header() {

    const style = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid black',
        paddingBottom: '4px'
    }

    return (
        element('div', {style},
            element('div', {textContent: 'Mental Load it Up'}),
            element('a', {textContent: 'Account'}),
        )
    )
}

export function Dash() {
    return (
        element('div', {className: 'dash'},
            Header(),
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