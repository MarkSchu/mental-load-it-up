import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { user } from 'data/user.js';
import { disable } from 'utils/binders.js';
import { pathname } from 'data/pathname.js';

export const Signup = () => {

    const onsubmit = (e) => {
        const form = e.target;
        if (form.reportValidity()) {
            const email = form.elements.email.value;
            const password = form.elements.password.value;
            user.signup(email, password);
        }
        return false;
    }

    return (
        element('form', {
            className: 'form',
            onsubmit
        },
            element('h1', {
                className: 'h1 form-h1',
                textContent: 'Signup'
            }),
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
                textContent: 'Signup'
            })
        )
    )
}
