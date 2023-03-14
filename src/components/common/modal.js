import { element } from 'utils/dom.js';
import { hasNoErrors } from 'utils/validation.js';
import { observeAndCompute, ObservableBool, ObservableVar, combineAndObserve } from 'utils/observable.js';

export function Modal({
    title,  
    showModal, 
    errors,
    onSubmit,
    onSuccess,
}, 
    modalBody
) {

    const isValid = observeAndCompute(errors, hasNoErrors);
    const isSubmitting = new ObservableBool(false);
    const errorMessage = new ObservableVar(null);
    
    const submit = () => {
        isSubmitting.set(true);
        const handlers = {
            success: (data) => {
                onSuccess(data);
                showModal.set(false);
            },
            failure: (code) => {
                errorMessage.set(code);
            },
            done: () => {
                console.log('done')
                isSubmitting.set(false);
            }
        }
        onSubmit(handlers);
    }
    
    return (
        element('div', {
            className: 'modal',
            bind: [[showModal, (el, value) => {
                el.hidden = !value;
            }]]
        },
            element('h3', {
                className: 'modal-header',
                textContent: title
            }),

            modalBody,

            element('div', {className: 'modal-footer'},
                element('div', {},
                    element('button', {
                        textContent: 'nevermind',
                        onclick: () => showModal.set(false),
                        bind: [
                            [isSubmitting, (el, value) => {
                                el.disabled = value
                         }]]
                    }),
                    element('button', {
                        textContent: 'create',
                        onclick: submit,
                        bind: [
                            [combineAndObserve(isValid, isSubmitting), (el, values) => {
                                if (!values) {
                                    el.disabled = true;
                                    return;
                                }
                                el.disabled = !values[0];
                                if (values && values[1]) {
                                    el.disabled = true;
                                }
                            }]
                        ]
                    })
                ),
                element('div', {
                    textContent: 'Saving...',
                    bind: [[isSubmitting, (el, value) => {
                        el.hidden = !value;
                    }]]
                })
            )
        )
    )
}


