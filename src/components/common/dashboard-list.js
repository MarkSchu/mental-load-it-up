import { element, bindrepeat } from 'utils/dom.js';
import { repeat } from 'utils/binders.js';
import { TaskListItem } from 'components/common/task-list-item.js';
import state from 'data/state.js';

export function DashboardList({
    className,
    collectionName,
    modal,
    selectedTab,
}) {

    const list = state[collectionName];

    const displayList = (el, value) => {
        value === collectionName
        ?  el.classList.add('selected')
        : el.classList.remove('selected');
    }
    
    return (
        element('div', {
            className: `dashboard-list ${className}`,
            bind: [[selectedTab, displayList]]
        },
            modal,
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