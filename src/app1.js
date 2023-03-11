import { bind, bindElement, element, repeat } from './utils/dom.js';
import { 
    ObservableVar,
    observeAndCompute,
    combineAndObserve 
} from './utils/observable.js';
import sheet from './app.css' assert { type: 'css' };
import { getDomains, createDomain } from './api.js';
document.adoptedStyleSheets = [sheet];

// validation 

const validateName = (name) => {
    // return validateValue(
    //     name,
    //     isRequired
    // )[0];
}

const validateDomain = () => {}

const validateTags = () => {}

const validateForm = () => {}

// resusable binders

const hideWhenFalse = (el, value) => {
    el.hidden = !value;
};

// const hideWhenTrue = () 

const disableWhenTrue = (el, value) => {
    el.disabled = value;
};

// custom components

function DomainRow(domain) {
    return (
        element('div', {},
            element('div', {textContent: domain.name}),
            element('div', {textContent: domain.category}),
        )
    )
}

function InputWithValidation(label, field, error) {

    const oninput = (e) => {
        field.set(e.target.value);
        showError.set(false);
    }

    const onblur = () => {
        showError.set(true);
    }

    return (
        element('div', {},
            element('label', {textContent: label}),
            element('input', {oninput, onblur}),
            element('div', {}),
        )
    )
}

function CreateDomainModal(showCreateModal) {

    const domain = new ObservableVar('');
    const tags = new ObservableVar([]);
    const domainError = observeAndCompute(domain, validateDomain);
    const tagsError = observeAndCompute(domain, validateTags);
    const formIsValid = observeAndCompute(
        combineAndObserve(domainError, tagsError), 
        validateForm
    );
    const savingDomain = new ObservableVar(false);

    const closeModal = () => {
        showCreateModal.set(false);
    }

    const tryToCreateDomain = (e) => {
        createDomain({
            name
        });
    }

    const showSuccessMessage = (el, value) => {
        el.textContent = 'Success!';
    }

    return (
        element('div', {
            className: 'create-modal',
            hidden: true,
            bind: [[showCreateModal, hideWhenFalse]]
        },
            // InputWithValidation(
            //     'domainName', 
            //     domainName, 
            //     domainNameError
            // ),
            element('div', {},
                element('button', {
                    textContent: 'create',
                    onclick: tryToCreateDomain,
                    bind: [[savingDomain, disableWhenTrue]]
                }),
                element('button', {
                    textContent: 'nevermind',
                    onclick: closeModal,
                    bind: [[savingDomain, disableWhenTrue]]
                })
            ),
            element('div', {
                textContent: 'Saving...',
                hidden: true,
                bind: [
                    [savingDomain, hideWhenFalse],
                    // [savingDomainSuccess, showSuccessMessage]
                ]
            })
        )
    )
}

function MainList(domains) {

    const showTaskCreationModal = new ObservableVar(false);
    const showEventCreationModal = new ObservableVar(false);

    const toggleTaskButtonText = (el, value) => {
        el.textContent = value ? 'Nevermind' : 'Add Task';
    };

    const toggleEventButtonText = (el, value) => {
        el.textContent = value ? 'Nevermind' : 'Add Event';
    };

    const toggleTaskCreationModal = () => {
        showTaskCreationModal.set(!showTaskCreationModal.value)
    }

    const toggleEventCreationModal = () => {
        showEventCreationModal.set(!showEventCreationModal.value)
    }

    return (
        element('div', {}, 
            element('h1', {textContent: 'The List'}),
            element('button', {
                onclick: toggleTaskCreationModal,
                bind: [[showTaskCreationModal, toggleTaskButtonText]]
            }),
            element('button', {
                onclick: toggleEventCreationModal,
                bind: [[showEventCreationModal, toggleEventButtonText]]
            }),
            element('div', {},
                repeat(domains, (domain) => 
                    DomainRow(domain)
                )
            ),
            // CreateDomainModal(
            //     showCreateModal
            // )
        )
    )
}

export function App() {

    const loading = new ObservableVar(true);
    const error = new ObservableVar('');
    const domains = new ObservableVar([]);    

    getDomains().then((data) => {
        loading.set(false);
        domains.set(data);
    });

    const hideWhenDone = (el, value) => {
        el.style.display = value ? 'initial' : 'none';
    }

    return (
        element('div', {},
            element('div', {
                textContent: 'Loading...',
                bind: [
                    [loading, hideWhenDone]
                ]
            }),
            bind(domains, (value) => 
                value.length
                ? MainList(value)
                : element('div')
            )
        )   
    )
}  

