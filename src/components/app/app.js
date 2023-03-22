import { bind, element } from 'utils/dom.js';
import { ObservableVar } from 'utils/observable.js';
import { Dashboard } from 'components/app/dashboard.js';
import api from 'utils/api.js';
import sheet from 'styles/app.css' assert { type: 'css' };
document.adoptedStyleSheets = [sheet];


export function App() {

    const userData = new ObservableVar(null);  
    const errorMessage = new ObservableVar(null);

    const getErrorText = () => {
        return 'Mmmmm, someting went wrong! Try refreshing the page.';
    }

    const showErrorMessage = (el, message) => {
        el.textContent = message;
    }

    api.getUserData({
        success: (data) => userData.set(data),
        failure: (code) => errorMessage.set(getErrorText(code))
    });

    return (
        element('div', {},
            bind(userData, (data) => 
                data
                ? Dashboard(data) 
                : element('div', {textContent: 'loading...'})
            ),
            element('div', {
                bind: [[errorMessage, showErrorMessage]]
            })
        
        )   
    )
}  

