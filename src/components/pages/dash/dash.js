import { element } from 'utils/dom.js';
import { TaskList } from 'components/common/task-list.js';
import { AppHeader } from 'components/common/app-header.js';
import { CreateMember } from 'components/common/create-member.js';


function HeadingSelect() {
    return (
        element('select', {className: 'heading-select'},
            element('option', {textContent: 'Tasks'}),
            element('option', {textContent: 'Events'}),
            element('option', {textContent: 'Tags'}),
        )
    )
}

function HeadingMenu() {
    return (
        element('div', {className: 'heading-menu'},
            element('a', {textContent: 'Account'}),
            element('a', {textContent: 'Logout'}),
        )
    )
}

function DashHeader() {
    return (
        element('div', {className: 'dash-header'},
            HeadingSelect(),
            HeadingMenu()
        )
    )
}

function DashFooter() {
    return (
        element('div', {className: 'dash-footer'},
            element('button', {
                className: 'create-button button button-primary',
                textContent: 'Create'
            })
        )
    )
}

export function Dash() {
    return (
        element('div', {},
            DashHeader(),
            TaskList(),
            DashFooter()
        )
    )
}