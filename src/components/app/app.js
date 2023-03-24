import { bind, element } from 'utils/dom.js';
import { ObservableVar, ObservableBool } from 'utils/observable.js';
import { Dashboard } from 'components/app/dashboard.js';
import state from 'data/state.js';
import sheet from 'styles/app.css' assert { type: 'css' };
document.adoptedStyleSheets = [sheet];


export function App() {

    const loading = new ObservableBool(true);  
    const errorMessage = new ObservableVar(null);

    const getErrorText = () => {
        return 'Mmmmm, someting went wrong! Try refreshing the page.';
    }

    const showErrorMessage = (el, message) => {
        el.textContent = message;
    }

    state.getAllUserData().then((res) => {
        if (res.status > 200) {
            errorMessage.set(getErrorText(code))
        }
    });

    return (
        element('div', {},
            bind(loading, (value) =>
                value
                ? Dashboard()
                : element('div', {textContent: 'loading...'})
            ),
            element('div', {
                bind: [[errorMessage, showErrorMessage]]
            })
        
        )   
    )
}  



