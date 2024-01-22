import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { user } from 'data/user.js';
import { disable } from 'utils/binders.js';
import { pathname } from 'data/pathname.js';

export const SignupForm = () => {

    const disableSubmit = new ObservableBool(false);

    const signup = (event) => {
        event.preventDefault();
        disableSubmit.true();
        const form = event.target.parentElement;
        if (form.reportValidity()) {
            const email = form.elements.email.value;
            const password = form.elements.password.value;
            user.signup(email, password)
            .then(() => {
                disableSubmit.false();
                form.reset();
            })
        } else {
            disableSubmit.false();
        }
    }

    return (
        element('form', {},
            element('label', {
                className: 'label',
                textContent: 'Email'
            }),
            element('input', {
                className: 'input form-input',
                type: 'email',
                name: 'email',
                required: true
            }),
            element('label', {
                className: 'label',
                textContent: 'Password'
            }),
            element('input', {
                className: 'input form-input',
                type: 'password',
                name: 'password',
                required: true
            }),
            element('button', {
                className: 'button button-primary',
                onclick: signup,
                textContent: 'Signup',
                bind:[[disableSubmit, disable]]
            })
        )
    )
}

export function Signup() {
    return (
        element('div', {className: 'form-page'},
            element('h1', {
                className: 'h1 form-h1',
                textContent: 'Signup'
            }),
            SignupForm('/dash')
        )
    )
}