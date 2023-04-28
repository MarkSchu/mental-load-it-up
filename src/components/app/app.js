import { bind, element } from 'utils/dom.js';
import { pathname } from 'data/pathname.js';
import { LoginPage } from 'components/auth/login-page.js';
import { SignupPage } from 'components/auth/signup-page.js';
import { Dashboard } from 'components/app/dashboard.js';
import sheet from 'styles/app.css' assert { type: 'css' };
document.adoptedStyleSheets = [sheet];

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
                    return Dashboard();
                }
                return Page404();
            })
        )   
    )
}  

