import { element } from 'utils/dom.js';
import { user } from 'data/user.js';

export const Signup = () => {

    let form;

    const signup = (e) => {
        if (form.reportValidity()) {
            const email = form.elements.email.value;
            const password = form.elements.password.value;
            user.signup(email, password);
        }
    }

    return (
        element('div', {className: 'form-page'},
            form = element('form', {},
                element('h1', {
                    className: 'h1',
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
                })
            ),
            element('div', {className: 'buttons'},
                element('button', {
                    className: 'button button-primary',
                    textContent: 'Signup',
                    onclick: signup
                })
            )
        )
    )
}
