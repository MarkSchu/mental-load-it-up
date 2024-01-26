import { bind, element } from 'utils/dom.js';
import { pathname } from 'data/pathname.js';
import { general } from 'data/general.js';
import { Alert } from 'components/common/alert.js';
import { Signup } from 'components/signup.js';
import { Login } from 'components/login.js';
import { Dash } from 'components/dash/dash.js'
import { Account } from 'components/account.js'

pathname.onSet((pathnameVal) => {
    if (pathnameVal === '/dash') {
        general.init();
    }
});

export function App() {
    return (
        element('div', {className: 'app'},
            Alert(),
            bind(pathname, (pathnameVal) => {
                if (pathnameVal === '/signup') {
                    return Signup();
                }
                if (pathnameVal === '/login') {
                    return Login();
                }
                if (pathnameVal === '/dash') {
                    return Dash();
                }
                if (pathnameVal === '/account') {
                    return Account();
                }
                return element('div', {textContent: `Page ${pathnameVal} Not Found :(`})
            })
        )   
    )
}  

document.body.appendChild(
    App()
);
