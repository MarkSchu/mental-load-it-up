import { element } from 'utils/dom.js';
import { ObservableArray, ObservableVar } from 'utils/observable.js';
import { DashboardList } from 'components/common/dashboard-list.js';
import { CreateTaskModal } from 'components/app/create-task-modal.js';
import { CreateEventModal } from 'components/app/create-event-modal.js';
import { CreateDomainModal } from 'components/app/create-domain-modal.js';

export function Dashboard(userData) {
    
    userData = {
        tasks: new ObservableArray(userData.tasks || []),
        events: new ObservableArray(userData.events || []),
        domains: new ObservableArray(userData.domains || [])
    }

    const selectedTab = new ObservableVar('tasks');

    const selectTab = (e) => {
        selectedTab.set(e.target.value);
    }

    const fadeTitle = (el, value) => {
        el.style.opacity = el.value === value ? 1 : 0.5;
    }

    return (
        element('div', {className: 'dashboard'},
            element('h1', {textContent: 'Dashboard'}),
            // element('div', {className: 'menu'},
            //     element('h2', {
            //         textContent: 'Tasks',
            //         value: 'tasks',
            //         onclick: selectTab,
            //         bind: [[selectedTab, fadeTitle]]
            //     }),
            //     element('h2', {
            //         textContent: 'Events',
            //         value: 'events',
            //         onclick: selectTab,
            //         bind: [[selectedTab, fadeTitle]]
            //     }),
            //     element('h2', {
            //         textContent: 'Domains',
            //         value: 'domains',
            //         onclick: selectTab,
            //         bind: [[selectedTab, fadeTitle]]
            //     })
            // ),
            element('div', {className: 'lists-wrapper'},
                DashboardList({
                    className: 'task-list',
                    title: 'Tasks',
                    model: 'tasks',
                    userData,
                    selectedTab,
                    createModal: CreateTaskModal,
                }),
                DashboardList({
                    className: 'event-list',
                    title: 'Events',
                    model: 'events',
                    userData,
                    selectedTab,
                    createModal: CreateEventModal
                }),
                DashboardList({
                    className: 'domain-list',
                    title: 'Domains',
                    model: 'domains',
                    userData,
                    selectedTab,
                    createModal: CreateDomainModal
                })
            )
        )
    )
}
