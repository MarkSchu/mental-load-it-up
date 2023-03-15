import { element, bind } from 'utils/dom.js';
import { ObservableArray, ObservableBool } from 'utils/observable.js';
import { setValue } from 'utils/binders.js';


export function InputWithValidation({
    type, 
    label, 
    field,
    errors
}) {

    const showError = new ObservableBool(false);

    const oninput = (e) => {
        field.set(e.target.value);
        showError.set(false);
    }

    const onblur = () => {
        showError.set(true);
    }

    const displayError = (el, values) => {
        el.textContent = values.length || values[0];
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
                bind: [[field, setValue]]
            }),
            element('div', {
                bind: [[errors, displayError]]
            })
        )
    )
}