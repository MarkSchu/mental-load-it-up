import { bind, element } from 'utils/dom.js';
import { pathname } from 'data/pathname.js';
import { Loader } from 'components/common/loader.js';
import { Signup } from 'components/pages/signup/signup.js';
import { Login } from 'components/pages/login/login.js';
import { Dash } from 'components/pages/dash/dash.js'


export function App() {
    return (
        element('div', {className: 'theme1'},
            Loader(),
            bind(pathname, (pathnameVal) => {
                if (pathnameVal === '/dash') {
                    return Dash();
                }
                if (pathnameVal === '/signup') {
                    return Signup();
                }
                if (pathnameVal === '/login') {
                    return Login();
                }
                return element('div', {textContent: `Page ${pathnameVal} Not Found :(`})
            })
        )   
    )
}  

