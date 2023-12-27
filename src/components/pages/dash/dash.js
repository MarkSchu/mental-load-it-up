import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { TaskList } from 'components/common/task-list.js';
import { CreateTaskForm } from 'components/common/create-task-form.js';

function HeadingSelect() {
    return (
        element('select', {className: 'dash-header-select'},
            element('option', {textContent: 'Tasks'}),
            element('option', {textContent: 'Events'}),
            element('option', {textContent: 'Tags'}),
        )
    )
}

function HeadingMenu() {
    return (
        element('div', {className: 'dash-header-menu'},
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

    const isModalOpen = new ObservableBool(false);

    const onclick = () => {
        isModalOpen.true();
    }

    const showModal = (el, val) => {
        el.style.display = val ? 'block' : 'none';
    }

    return (
        element('div', {className: 'dash-footer'},
            element('div', {
                className: 'modal',
                bind: [[isModalOpen, showModal]]
            },  
                CreateTaskForm(isModalOpen)
            ),
            element('button', {
                className: 'create-button button button-primary',
                textContent: 'Create',
                onclick
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