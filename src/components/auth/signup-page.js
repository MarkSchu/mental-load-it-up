import { element } from 'utils/dom.js';
import { user } from 'data/user.js';
import { ObservableBool } from 'utils/observable.js';
import { disable } from 'utils/binders.js';

export function SignupPage() {

    const disableSubmit = new ObservableBool(false);

    const submit = (event) => {
        event.preventDefault();
        disableSubmit.true();
        const form = document.forms.signupForm;
        const isValid = form.reportValidity();
        if (isValid) {
            const email = form.elements.email.value;
            const password = form.elements.password.value;
            user.signup(email, password).then(() => {
                disableSubmit.false();
            });
        }
    }

    return (
        element('div', {},
            element('h1', {textContent: 'Signup'}),
            element('form', {id: 'signupForm'},
                element('div', {},
                    element('label', {
                        textContent: 'Email', 
                        for: 'email'
                    }),
                    element('input', {
                        type: 'email',
                        id: 'email',
                        name: 'email',
                        required: true
                    })
                ),
                element('div', {},
                    element('label', {
                        textContent: 'Password', 
                        for: 'password'
                    }),
                    element('input', {
                        type: 'password',
                        id: 'password',
                        name: 'password',
                        required: true
                    })
                ),
                element('button', {
                    textContent: 'Signup!',
                    bind:[[disableSubmit, disable]],
                    onclick: submit
                })
            )
        )
    )
}