import { element } from 'utils/dom.js';
import { user } from 'state/user.js';

export function DashHeader() {

    const logout = () => {
        user.logout();
    }

    const getToday = () => {
        return (new Date()).toDateString();
    }

    return (
        element('div', {className: 'dash-header'},
            element('span', {
                className: 'today',
                textContent: getToday()
            }),
            element('span', {
                className: 'logout',
                textContent: 'Logout',
                onclick: logout
            })
        )       
    )
}