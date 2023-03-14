import { element } from 'utils/dom.js';
import { ObservableArray } from 'utils/observable.js';
import { DashboardList } from 'components/common/dashboard-list.js';
import { TaskModal } from 'components/app/task-modal.js';

export function Dashboard(userdata) {
        
        const tasks = new ObservableArray(userdata.tasks || []);
        const events = new ObservableArray(userdata.events || []);
        const domains = new ObservableArray(userdata.domains || []);

    return (
        element('div', {},
            element('h1', {textContent: 'Dashboard'}),
            DashboardList({
                title: 'Tasks', 
                cta: 'Add Task',
                collection: tasks,
                modal: TaskModal,
                modalProps: {tasks, events, domains},
                listItemComponent:  (task) => 
                    element('div', {textContent: task.name})
            })
            // DashboardList({
            //     title: 'Events', 
            //     cta: 'Add Event',
            //     collection: events,
            //     modal: () => {}
            // }, (event) => 
            //     element('div', {textContent: event.name})
            // ),
            // DashboardList({
            //     title: 'Domains', 
            //     cta: 'Add Domain',
            //     collection: domains,
            //     modal: () => {}
            // }, (domain) => 
            //     element('div', {textContent: domain.name})
            // )
        )
    )
}