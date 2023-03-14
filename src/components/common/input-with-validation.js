import { element, bind } from 'utils/dom.js';
import { ObservableVar } from 'utils/observable.js';


export function InputWithValidation(type, label, field, errors) {

    const showError = new ObservableVar(false);

    const oninput = (e) => {
        field.set(e.target.value);
        showError.set(false);
    }

    const onblur = () => {
        showError.set(true);
    }

    return (
        element('div', {},
            element('label', {
                textContent: label
            }),
            element('input', {
                type,
                oninput,
                onblur,
                bind: [[field, (el, value) => el.value = value]]
            }),
            bind(showError, (value) => {
                return value 
                ? element('div', {textContent: errors.value[0]}) 
                : element('div', {})
            })
        )
    )
}