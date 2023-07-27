import { element } from 'utils/dom.js';
import state from 'data/state.js';
import { repeatWith } from 'utils/binders.js';
import { DeleteTaskButton } from 'components/app-mvp/delete-task-button.js';
import { CompleteTaskButton } from 'components/app-mvp/complete-task-button.js'
import { EditTaskForm } from 'components/app-mvp/edit-task-form.js';

const displayDomainName = (task) => (el, domains) => {
    const domain = domains.find(item => item._id === task.domainId);
    if (domain) {
        el.textContent = `domain: ${domain.name}`;
    }
}

export const TaskList = () => {
    return (
        element('div', {},
            element('h2', {textContent: 'Tasks'}),
            element('div', {
                bind: [[state.tasks, repeatWith(TaskListItem)]]
            })
        )
    )
}

export const TaskListItem = (task) => {
    return (
        element('div', {},
            element('div', {textContent: `name: ${task.name}`}),
            element('div', {textContent: `due date: ${task.dueDate}`}),
            element('div', {textContent: `complete: ${task.complete}`}),
            element('div', {textContent: `domainId: ${task.domainId}`}),
            element('div', {bind: [[state.domains, displayDomainName(task)]]}),
            element('div', {textContent: `teamId: ${task.teamId}`}),
            element('div', {textContent: `_id: ${task._id}`}),
            EditTaskForm(task),
            DeleteTaskButton(task._id),
            CompleteTaskButton(task),
            element('br', {})
        )
    )
}