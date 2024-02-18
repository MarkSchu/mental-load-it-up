import { element, boolToInlineDisplay } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { collections } from 'state/collection.js';
import { TaskEditForm } from 'components/dash/task-edit-form.js';
import { getDaysUntilDeadline } from 'utils/dates.js';


function Checkbox (task, toggleDone) {
    return (
        element('div', {className: 'checkbox'},
            element('input', {
                className: 'checkbox-input',
                type: 'checkbox',
                checked: task.complete,
                onchange: toggleDone
            }),
            element('div', {className: 'checkmark'})
        )
    )
}

export function TaskItem(task) {

    const domain = collections.domains.value.find(domain => domain._id === task.domain);
    const daysUntilDueDate = getDaysUntilDeadline(task.dueDate);
    const showDomain = !!domain;
    const showDaysUntilDueDate = !isNaN(daysUntilDueDate);
    const showDetails = showDomain || showDaysUntilDueDate;
    const showModal = new ObservableBool(false);
    const daysUntilDueDateLabel = daysUntilDueDate === 1 ? 'day' : 'days'
   
    const toggleDone = () => {
        collections.tasks.update(task._id, {
            complete: !task.complete
        });
    }

    const deleteTask = () => {
        collections.tasks.delete(task._id);
    }

    const openEditModal = () => {
        showModal.true();
    }

    return (
        element('div', {className: 'panel'},
            TaskEditForm(task, showModal),
            element('div', {className: 'left'},
                Checkbox(task, toggleDone)
            ),
            element('div', {className: 'center info', onclick: openEditModal},
                element('div', {className: 'title', textContent: task.title}),
                element('div', {
                    className: 'details',
                    style: {display: showDetails ? 'initial' : 'none'}
                },
                    element('span', {
                        className: 'days-until',
                        textContent: `${daysUntilDueDate} ${daysUntilDueDateLabel}`,
                        style: {
                            display: daysUntilDueDate ? 'initial' : 'none'
                        }
                    }),
                    element('span', {
                        className: 'domain',
                        textContent: domain?.title,
                        style: {
                            display: showDomain ? 'initial' : 'none'
                        }
                    })
                ),
            ),
            element('div', {className: 'right'},
                element('span', {
                    className: 'delete',
                    textContent: '×',
                    onclick: deleteTask
                })
            )
        )
    )
}
