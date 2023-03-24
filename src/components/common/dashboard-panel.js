import { element } from 'utils/dom.js';
import { ObservableVar, ObservableBool } from 'utils/observable.js';
import { DashboardList } from 'components/common/dashboard-list.js';
import { DashboardMenu } from 'components/common/dashboard-menu.js';
import { CreateTaskModal } from 'components/app/create-task-modal.js';
import { CreateEventModal } from 'components/app/create-event-modal.js';
import { CreateDomainModal } from 'components/app/create-domain-modal.js';
import { TASKS, EVENTS, DOMAINS } from 'data/collection-names.js';
import { TaskListItem } from 'components/common/task-list-item.js';
import { EventListItem } from 'components/common/event-list-item.js';
import { DomainListItem } from 'components/common/domain-list-item.js';


export function DashboardPanel({
    className,
    startTab
}) {

    const selectedTab = new ObservableVar(startTab);
    const isModalOpen = new ObservableBool(false);

    const toggleModalOpen = () => {
        isModalOpen.toggle();
    }

    const toggleButtonText = (el, value) => {
        el.textContent = value ? 'Cancel' : 'Create'
    }

    const showTitle = (el, value) => {
        el.textContent = value;
    }
    
    return (
        element('div', {className: `dash-panel ${className}`},
            element('h2', {
                className: 'title',
                bind: [[selectedTab, showTitle]]
            }),
            DashboardMenu({selectedTab}),
            element('button', {
                className: 'add-button',
                bind: [[isModalOpen, toggleButtonText]],
                onclick: toggleModalOpen
            }),
            element('div', {className: 'lists-wrapper'},
                DashboardList({
                    className: 'task-list',
                    collectionName: TASKS,
                    selectedTab,
                    modal: CreateTaskModal(isModalOpen),
                    memberComponent: TaskListItem
                }),
                DashboardList({
                    className: 'event-list',
                    collectionName: EVENTS,
                    selectedTab,
                    modal: CreateEventModal(isModalOpen),
                    memberComponent: EventListItem
                }),
                DashboardList({
                    className: 'domain-list',
                    collectionName: DOMAINS,
                    selectedTab,
                    modal: CreateDomainModal(isModalOpen),
                    memberComponent: DomainListItem
                })
            )
        )
    )
}