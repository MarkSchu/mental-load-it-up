import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import state from 'data/state.js';
import { disable } from 'utils/binders.js';

export const InviteForm = () => {

    const disableSubmit = new ObservableBool(false);

    const invite = (event) => {
        event.preventDefault();
        disableSubmit.true();
        const form = event.target.parentElement;
        if (form.reportValidity()) {
            const params = new URLSearchParams(window.location.search);
            const email = form.elements.email.value;
            const password = form.elements.password.value;
            const teamId =  params.get('teamId');
            state.user.invite(email, password, teamId).then(() => {
                disableSubmit.false(); 
                form.reset();
            });
        }
        disableSubmit.false(); 
    }

    return (
        element('form', {},
            element('input', {
                type: 'email',
                name: 'email',
                placeholder: 'email',
                required: true
            }),
            element('input', {
                type: 'password',
                name: 'password',
                placeholder: 'password',
                required: true
            }),
            element('button', {
                onclick: invite,
                textContent: 'Invite',
                bind:[[disableSubmit, disable]]
            })
        )
    )
}