import { element } from 'utils/dom.js';
import { ObservableVar, ObservableBool } from 'utils/observable.js';
import { DashboardList } from 'components/common/dashboard-list.js';
import { DashboardMenu } from 'components/common/dashboard-menu.js';
import { CreateTaskModal } from 'components/app/create-task-modal.js';
import { CreateEventModal } from 'components/app/create-event-modal.js';
import { CreateDomainModal } from 'components/app/create-domain-modal.js';

export function DashboardPanel({
    userData,
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
                    title: 'Tasks',
                    model: 'tasks',
                    userData,
                    selectedTab,
                    createModal: CreateTaskModal,
                    isModalOpen
                }),
                DashboardList({
                    className: 'event-list',
                    title: 'Events',
                    model: 'events',
                    userData,
                    selectedTab,
                    createModal: CreateEventModal,
                    isModalOpen
                }),
                DashboardList({
                    className: 'domain-list',
                    title: 'Domains',
                    model: 'domains',
                    userData,
                    selectedTab,
                    createModal: CreateDomainModal,
                    isModalOpen
                })
            )
        )
    )
}