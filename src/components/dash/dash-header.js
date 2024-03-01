import { element } from 'utils/dom.js';
import { user } from 'state/user.js';

export function DashHeader() {

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