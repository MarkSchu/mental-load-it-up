import { bind, element } from 'utils/dom.js';
import { Dashboard } from 'components/app/dashboard.js';
import { pathname, redirect } from 'utils/pathname.js';
import { AuthPage } from 'components/auth/auth.js';
import sheet from 'styles/app.css' assert { type: 'css' };
document.adoptedStyleSheets = [sheet];


export function App() {

    const user = netlifyIdentity.currentUser();
   
    return (
        element('div', {},
            bind(pathname, (value) => {
                if (!user) {
                    return redirect('/auth');
                }
                if (value === '/') {
                    return Dashboard();
                }
                if (value === '/auth') {
                    return AuthPage()
                }
                return element('div', {textContent: '404 :('})
            })
        )   
    )
}  

