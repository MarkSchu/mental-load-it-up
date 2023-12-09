import { element } from 'utils/dom.js';
import { SignupForm } from 'components/common/signup-form.js';

export function SignupPage() {
    return (
        element('div', {},
            element('h1', {textContent: 'Signup'},
                SignupForm('/dash')
            )
        )
    )
}