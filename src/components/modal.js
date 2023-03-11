function Modal(showModal, title) {

    const isValid = observeAndCompute(allErrors, hasNoErrors);
    const saving = new ObservableVar();
    const saveError = new ObservableVar();

    return (
        element('div', {bind: [[showModal, hideWhenFalse]]},
            element('h3', {textContent: title}),
            child(isValud),
            ModalFooter(
                save,
                saving,
                isValid,
                showModal
            )
        )
    )
}


function SOmeForm() {
    const name = new ObservableVar('');
    const nameErrors = observeAndCompute(name, validateDomain);

    element('input', {
        type: 'text',
        oninput,
        bind: [[name, setValue]]
    }),
}

Modal(
    SomeForm()
)