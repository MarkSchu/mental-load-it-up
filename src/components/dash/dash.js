import { element, repeat } from 'utils/dom.js';
import { bind } from 'utils/binders.js';
import { collections } from 'state/collection.js';
import { DashList } from 'components/dash/dash-list.js';
import { DashFooter } from 'components/dash/dash-footer.js';
import { user } from 'state/user.js';
import { ObservableVar } from 'utils/observable.js';

const collectionNames = {
    tasks: 'Tasks',
    events: 'Events',
    domains: 'Categories',
}

function DashHeader() {

    const logout = () => {
        user.logout();
    }

    return (
        element('div', {className: 'dash-header'},
            element('div', {className: 'right'},
                element('span', {
                    className: 'logout',
                    textContent: 'Logout',
                    onclick: logout
                })
            )
        )       
    )
}

export function Dash() {

    const mainSelection = new ObservableVar('tasks');
    const domainSelection = new ObservableVar('all');

    return (
        element('div', {className: 'dash'},
            DashHeader(),
            DashList(mainSelection, domainSelection),
            DashFooter(mainSelection, domainSelection)
        )
    )
}

