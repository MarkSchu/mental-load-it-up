import { element } from 'utils/dom.js';
import { ObservableArray } from 'utils/observable.js';
import { DashboardPanel } from 'components/common/dashboard-panel.js';
import { CreateTaskModal } from './create-task-modal';

export function Dashboard(userData) {
    
    userData = {
        tasks: new ObservableArray(userData.tasks || []),
        events: new ObservableArray(userData.events || []),
        domains: new ObservableArray(userData.domains || [])
    }

    return (
        element('div', {className: 'dashboard'},
            element('h1', {textContent: 'Dashboard'}),
            element('div', {className: 'panels-wrapper'},
                DashboardPanel({
                    userData,
                    className: 'panel-1',
                    startTab: 'tasks'
                }),
                DashboardPanel({
                    userData,
                    className: 'panel-2',
                    startTab: 'events'
                }),
                DashboardPanel({
                    userData,
                    className: 'panel-3',
                    startTab: 'domains'
                })
            )
        )
    )
}
