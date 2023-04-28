import { element } from 'utils/dom.js';
import { DashboardPanel } from 'components/common/dashboard-panel.js';
import { TASKS, EVENTS, DOMAINS } from 'data/collection-names.js';
import state from 'data/state.js';
import { showIfTrueHideIfNot } from 'utils/binders.js';

export function Dashboard() {
    return (
        element('div', {className: 'dashboard'},
            element('div', {
                textContent: 'Loading...',
                bind: [[state.isInitApp, showIfTrueHideIfNot]]
            }),
            element('h1', {textContent: 'Dashboard'}),
            element('div', {className: 'dash-panels'},
                DashboardPanel({
                    className: 'panel-1',
                    startTab: TASKS
                }),
                DashboardPanel({
                    className: 'panel-2',
                    startTab: EVENTS
                }),
                DashboardPanel({
                    className: 'panel-3',
                    startTab: DOMAINS
                })
            )
        )
    )
}
