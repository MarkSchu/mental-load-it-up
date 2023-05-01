import { bind, element } from 'utils/dom.js';
import { pathname } from 'data/pathname.js';
import { LoginPage } from 'components/auth/login-page.js';
import { SignupPage } from 'components/auth/signup-page.js';
import { Dashboard } from 'components/app/dashboard.js';
import state from 'data/state.js';
import { showIfTrueHideIfNot } from 'utils/binders.js';

export function App() {
    return (
        element('div', {},
            element('div', {
                textContent: 'Loading...',
                bind: [[state.loading, showIfTrueHideIfNot]]
            }),
            bind(pathname, (pathnameVal) => {
                if (pathnameVal === '/signup') {
                    return SignupPage();
                }
                if (pathnameVal === '/login') {
                    return LoginPage();
                }
                if (pathnameVal === '/') {
                    return Dashboard();
                }
                return element('div', {textContent: 'Page Not Found :('})
            })
        )   
    )
}  

