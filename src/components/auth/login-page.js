import { element } from 'utils/dom.js';
import { user } from 'data/user.js';
import { ObservableBool } from 'utils/observable.js';
import { disable } from 'utils/binders.js';

export function LoginPage() {

    const disableSubmit = new ObservableBool(false);

    const submit = (event) => {
        disableSubmit.true();
        event.preventDefault();
        const { email, password } = document.forms.loginForm.elements;
        user.login(email.value, password.value)
        .catch((err) => {
            alert(err)
        })
        disableSubmit.false();
    }

    return (
        element('div', {},
            element('h1', {textContent: 'Login'}),
            element('form', {id: 'loginForm'},
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
                    textContent: 'Login!',
                    bind:[[disableSubmit, disable]],
                    onclick: submit
                })
            )
        )
    )
}