import { element, bindrepeat } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { repeat } from 'utils/binders.js';
import { TaskListItem } from 'components/common/task-list-item.js';

export function DashboardList({
    className,
    model,
    userData,
    createModal,
    selectedTab,
    isModalOpen
}) {

    const list = userData[model];

    const displayList = (el, value) => {
        value === model
        ?  el.classList.add('selected')
        : el.classList.remove('selected');
    }
    
    return (
        element('div', {
            className: `dashboard-list ${className}`,
            bind: [[selectedTab, displayList]]
        },
            createModal(isModalOpen, userData),
            element('div', {
                bind:[[list, (el, value) =>
                    repeat(el, value, (instance) => 
                        TaskListItem(instance)
                    )]]
            }),
            element('div', {
                textContent: 'nothing here yet...',
                bind: [[list, (el, value) => (el.hidden = !!value.length)]]
            })
        )
    )
}