import { element } from 'utils/dom.js';
import state from 'data/state.js';

export const LogoutButton = () => {

    const onclick = () => {
        state.user.logout();
    }

    return (
        element('button', { textContent: 'Logout', onclick})
    )
}