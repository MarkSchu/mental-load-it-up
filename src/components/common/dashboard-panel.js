import { element } from 'utils/dom.js';
import { ObservableVar, ObservableBool } from 'utils/observable.js';
import { DashboardList } from 'components/common/dashboard-list.js';
import { DashboardMenu } from 'components/common/dashboard-menu.js';
import { CreateTaskModal } from 'components/app/create-task-modal.js';
import { CreateEventModal } from 'components/app/create-event-modal.js';
import { CreateDomainModal } from 'components/app/create-domain-modal.js';
import { TASKS, EVENTS, DOMAINS } from 'data/collection-names.js';


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
        element('div', {className: `panel ${className}`},
            element('h2', {
                className: 'dash-title',
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
                    modal: CreateTaskModal(isModalOpen)
                }),
                DashboardList({
                    className: 'event-list',
                    collectionName: EVENTS,
                    selectedTab,
                    modal: CreateEventModal(isModalOpen)
                }),
                DashboardList({
                    className: 'domain-list',
                    collectionName: DOMAINS,
                    selectedTab,
                    modal: CreateDomainModal(isModalOpen)
                })
            )
        )
    )
}