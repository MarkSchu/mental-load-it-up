import { element } from 'utils/dom.js';
import { ObservableArray } from 'utils/observable.js';
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

    return (
        element('div', {},
            element('h1', {textContent: 'Dashboard'}),
            DashboardList({
                title: 'Tasks',
                model: 'tasks',
                userData,
                createModal: CreateTaskModal
            }),
            DashboardList({
                title: 'Events',
                model: 'events',
                userData,
                createModal: CreateEventModal
            }),
            DashboardList({
                title: 'Domains',
                model: 'domains',
                userData,
                createModal: CreateDomainModal
            })
        )
    )
}
