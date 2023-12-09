import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import state from 'data/state.js';
import { disable } from 'utils/binders.js';
import { pathname } from 'data/pathname.js';

export const SignupForm = (navigateToPath) => {

    const disableSubmit = new ObservableBool(false);

    const signup = (event) => {
        event.preventDefault();
        disableSubmit.true();
        const form = event.target.parentElement;
        if (form.reportValidity()) {
            const email = form.elements.email.value;
            const password = form.elements.password.value;
            state.user.signup(email, password).then(() => {
                disableSubmit.false();
                form.reset();
                if (navigateToPath) {
                    pathname.redirect(navigateToPath);
                }
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
                onclick: signup,
                textContent: 'Signup',
                bind:[[disableSubmit, disable]]
            })
        )
    )
}
