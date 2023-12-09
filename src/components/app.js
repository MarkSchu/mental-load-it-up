import { bind, element } from 'utils/dom.js';
import { pathname } from 'data/pathname.js';
import state from 'data/state.js';
import { Loader } from 'components/common/loader.js';
import { SignupPage } from 'components/pages/signup.js';
import { Debug } from 'components/pages/debug/debug.js';
import { Dash } from 'components/pages/dash.js'
import { CreateTaskForm } from 'components/common/create-task-form.js';
import { UX } from 'components/pages/ux/ux.js'


pathname.onSet((pathnameVal) => {
    if (pathnameVal === '/dash' || pathnameVal === '/debug') {
        state.init();
    }
});

export function App() {
    return (
        element('div', {},
            Loader(),
            bind(pathname, (pathnameVal) => {
                if (pathnameVal === '/debug') {
                    return Debug();
                }
                if (pathnameVal === '/ux') {
                    return UX();
                }
                if (pathnameVal === '/signup') {
                    return SignupPage();
                }
                if (pathnameVal === '/login') {
                    return LoginPage();
                }
                if (pathnameVal === '/dash') {
                    return Dash();
                }
                return element('div', {textContent: `Page ${pathnameVal} Not Found :(`})
            })
        )   
    )
}  

