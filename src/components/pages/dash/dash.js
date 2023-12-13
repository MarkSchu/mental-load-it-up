import { element } from 'utils/dom.js';
import { TaskList } from 'components/common/task-list.js';
import { AppHeader } from 'components/common/app-header.js';
import { CreateMember } from 'components/common/create-member.js';

function Modal() {
    return (
        element('div', {style: {
            position: 'fixed',
            top: '16px',
            bottom: '16px',
            left: '16px',
            right: '16px',
            backgroundColor: 'white',
            zIndex: 2,
            border: '1px solid #ccc',
            borderRadius: '16px'
        }},
            element('div', {},
                element('h1', {textContent: 'New Task', style: {textAlign: 'center', textDecoration: 'underline'}})
            )
        )
    )
}

export function Dash() {
    return (
        element('div', {className: 'dash'},
            // Modal(),
            element('div', {},
                element('div', { style: {
                    borderBottom: '1px solid black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }},
                    element('select', {style: {
                        fontSize: '24px',
                        border: 'none',
                        padding: '16px 0',
                        fontWeight: 'bold'
                    }},
                        element('option', {textContent: 'Tasks'}),
                        element('option', {textContent: 'Events'}),
                        element('option', {textContent: 'Tags'}),
                        element('option', {textContent: 'Meal Plan'}),
                        element('option', {textContent: 'Groceries'}),
                        element('option', {textContent: 'Out Of'}),
                    ),
                    element('div', {},
                        element('div', {textContent: 'Account'}),
                        element('div', {textContent: 'Logout'}),
                    )
                )
            ),
            TaskList(),
            element('div', {style: {
                position: 'fixed',
                bottom: '8px',
                left: '8px',
                right: '8px',
                textAlign: 'center',
                padding: '8px',
                backgroundColor: 'white',
                borderTop: '1px solid black'
            }},
                element('button', {
                    textContent: 'Create',
                    style: {
                        border: '1px solid #00bbf9',
                        padding: '16px 32px',
                        backgroundColor: '#00bbf9',
                        color: 'white',
                        fontWeight: 'bold',
                        width: '100%',
                        borderRadius: '16px',
                    }
                })
            )
        )
    )
}
