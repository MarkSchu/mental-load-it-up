import { element } from 'utils/dom.js';
import state from 'data/state.js';

export const UserInfoDisplay = () => {   

    const displayEmail = (el) => {
        el.textContent = `email: ${state.user?.email()}`;
    }

    const displayId = (el) => {
        el.textContent = `id: ${state.user?.id()}`;
    }

    return (
        element('div', {},
            element('div', {},
                element('a', {
                    href: 'https://app.netlify.com/sites/spontaneous-nougat-f22d85/identity',
                    textContent: 'Users'
                })
            ),
            element('br', {}),
            element('div', {bind: [
                [state.user, displayEmail]
            ]}),
            element('div', {bind: [
                [state.user, displayId]
            ]}),
            element('br', {})
        )
    );
}


