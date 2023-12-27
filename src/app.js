import { bind, element } from 'utils/dom.js';
import { pathname } from 'data/pathname.js';
import state from 'data/state.js';
import { Loader } from 'components/common/loader.js';
import { Signup } from 'components/pages/signup/signup.js';
import { Login } from 'components/pages/login/login.js';
import { Debug } from 'components/pages/debug/debug.js';
import { Styling } from 'components/pages/debug/styling.js';
import { Dash } from 'components/pages/dash/dash.js'


pathname.onSet((pathnameVal) => {
    if (pathnameVal === '/dash' || pathnameVal === '/debug') {
        state.init();
    }
});

export function App() {
    return (
        element('div', {className: 'theme1'},
            Loader(),
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
                if (pathnameVal === '/debug') {
                    return Debug();
                }
                if (pathnameVal === '/style') {
                    return Styling();
                }
                return element('div', {textContent: `Page ${pathnameVal} Not Found :(`})
            })
        )   
    )
}  

