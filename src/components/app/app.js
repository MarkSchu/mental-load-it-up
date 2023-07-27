import { bind, element } from 'utils/dom.js';
import { pathname } from 'data/pathname.js';
import { LoginPage } from 'components/auth/login-page.js';
import { SignupPage } from 'components/auth/signup-page.js';
import { Dash } from 'components/app-mvp/dash.js';
import state from 'data/state.js';
import { showIfTrueHideIfNot } from 'utils/binders.js';

pathname.onSet((pathnameVal) => {
    if (pathnameVal === '/') {
        state.init();
    }
});

export function App() {
    return (
        element('div', {},
            bind(pathname, (pathnameVal) => {
                if (pathnameVal === '/signup') {
                    return SignupPage();
                }
                if (pathnameVal === '/login') {
                    return LoginPage();
                }
                if (pathnameVal === '/') {
                    return Dash();
                }
                return element('div', {textContent: 'Page Not Found :('})
            })
        )   
    )
}  

