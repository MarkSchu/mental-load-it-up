import { element } from 'utils/dom.js';
import {
    ObservableBool,
    ObservableVar
} from 'utils/observable.js';

export function SubmissionModal({ 
    title, 
    isModalOpen, 
    callback, 
    success,
    isValid
}) {

    const isSubmitting = new ObservableBool(false);
    const submissionError = new ObservableVar('');

    const cancel = () => {
        isModalOpen.set(false);
    }

    const submit = () => {
        callback({
            success,
            failure: (code) => submissionError.set(code),
            done: () => isSubmitting.set(false)
        });
    }

    return (
        element('div', {},
            element('div', {textContent: title}),
            
        
            element('div', {},
                element('button', {
                    textContent: 'cancel',
                    onclick: cancel
                }),
                element('button', {
                    textContent: 'create',
                    onclick: submit
                }),
            )
        )
    )
}
