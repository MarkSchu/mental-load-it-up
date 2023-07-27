import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import state from 'data/state.js';
import { disable } from 'utils/binders.js';

export const LoginForm = () => {

    const disableSubmit = new ObservableBool(false);

    const login = (event) => {
        event.preventDefault();
        disableSubmit.true();
        const form = event.target.parentElement;
        if (form.reportValidity()) {
            const email = form.elements.email.value;
            const password = form.elements.password.value;
            state.user.login(email, password).then(() => {
                disableSubmit.false();
                form.reset();
            });
        } else {
            disableSubmit.false();
        }
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
                onclick: login,
                textContent: 'Login',
                bind:[[disableSubmit, disable]]
            })
        )
    )
}