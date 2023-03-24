import { element } from 'utils/dom.js';
import {
    ObservableBool,
    ObservableVar,
    combine
} from 'utils/observable.js';
import { show, disable } from 'utils/binders.js';

export function SubmissionModal({ 
    title, 
    isModalOpen, 
    form,
    isValid,
    resetFields,
    onSubmit
}) {

    const isSubmitting = new ObservableBool(false);
    const submissionError = new ObservableVar('');

    const cancel = () => {
        isModalOpen.set(false);
    }

    const submit = () => {
        isSubmitting.set(true);
        onSubmit().then((res) => {
            if (res.status > 299) {
                submissionError.set(res.status)
            } else {
                isModalOpen.toggle();
                resetFields();
            }
        })
    }

    const bindSubmit = (el, values) => {
        let disabled = true;
        if (values) {
            const isSub = values[0];
            const isVal = values[1];
            disabled = !isVal;
            if (isSub) {
                disabled = true;
            }
        }
        el.disabled = disabled;
    }

    return (
        element('div', {bind:[[isModalOpen, show]]},
            element('div', {textContent: title}),
            form,
            element('div', {},
                element('button', {
                    textContent: 'cancel',
                    onclick: cancel,
                    bind: [[isSubmitting, disable]]
                }),
                element('button', {
                    textContent: 'create',
                    onclick: submit,
                    bind: [[combine(isSubmitting, isValid), bindSubmit]]
                }),
            ),
            element('div', {
                textContent: 'saving...',
                bind: [[isSubmitting, show]]
            })
        )
    )
}
