import { bind, bindElement, element, repeat } from './utils/dom.js';
import { 
    ObservableVar,
    ObservableArray,
    observeAndCompute,
    combineAndObserve 
} from './utils/observable.js';
import sheet from './app.css' assert { type: 'css' };
import { getUserData, api } from './api.js';
document.adoptedStyleSheets = [sheet];

// resusable validation utils

const hasNoErrors = (arrays) => {
    return arrays?.flat().length === 0;
}

const isRequired = (value) => {
    return !!value || 'isRequired';
}

const isLongerThan = (number) => (value) => {
    return value.length > number || 'isLongerThan';
}

const validate = (...args) => {
    return args.filter(item => item !== true);
}

// custom validation schemas

const validateName = (value) => {
    return validate(
        isRequired(value),
        isLongerThan(2)(value)
    );
}

const validateDueDate = (value) => {
    return [
    ];
}

const validateDomain = (value) => {
    return validate(
        isLongerThan(2)(value)
    );
}

// resusable binders

const hideWhenTrue = (el, value) => {
    el.hidden = !value;
};

const hideWhenFalse = (el, value) => {
    el.hidden = !value;
};

const disableWhenTrue = (el, value) => {
    if (value) {
        el.disabled = true;
    }
};

const toggleDisabled = (el, value) => {
    el.disabled = !value;
};

const setValue = (el, value) => {
    el.value = value;
}

// reusable components

function ModalFooter(onclick, saving, isValid, showModal) {
    return (
        element('div', {},
            element('div', {},
                element('button', {
                    textContent: 'nevermind',
                    onclick: () => showModal.set(false),
                    bind: [
                        [saving, toggleDisabled]
                    ]
                }),
                element('button', {
                    textContent: 'create',
                    onclick,
                    bind: [
                        [saving, disableWhenTrue],
                        [isValid, toggleDisabled]
                    ]
                })
            ),
            element('div', {
                textContent: 'Saving...',
                bind: [[saving, hideWhenTrue]]
            })
        )
    )
}

function InputWithValidation(type, label, field, errors) {

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
                bind: [[field, setValue]]
            }),
            bind(showError, (value) => {
                return value 
                ? element('div', {textContent: errors.value[0]}) 
                : element('div', {})
            })
        )
    )
}

// custom components

function DomainInput(domains) {

    const name = new ObservableVar('');
    const nameErrors = observeAndCompute(name, validateDomain);
    const isValid = observeAndCompute(nameErrors, hasNoErrors);
    const saving = new ObservableVar(false);
    const saveError = new ObservableVar();
    
    const oninput = (e) => {
        name.set(e.target.value);
    }

    const onBefore = () => {
        saving.set(true);
    }

    const onSuccess = (domain) => {
        domains.push(domain);
        name.set('');
    }

    const onFailure = (error) => {
        saveError.set(error);
    }

    const onDone = () => {
        saving.set(false);
    }

    const save = () => {
        api.create('Domains',
            {
                name: name.value
            },
            onBefore,
            onSuccess,
            onFailure,
            onDone
        );
    }

    return (
        element('div', {},
            element('label', {textContent: 'domain'}),
            element('input', {
                type: 'text',
                oninput,
                bind: [[name, setValue]]
            }),
            element('button', {
                textContent: 'Add Domain',
                onclick: save,
                bind: [[combineAndObserve(saving, isValid), (el, value) => {
                    el.disabled = value && (value[0] || !value[1]);
                }]]
            }),
            element('div', {},
                bind(domains, (value) =>
                    repeat(value, (domain) => 
                        element('div', {textContent: domain.name})
                    )
                )
            ),
        )
    )
}

function TaskAddModal(showModal, tasks, domains) {
    
    const name = new ObservableVar('');
    const dueDate = new ObservableVar();
    const nameErrors = observeAndCompute(name, validateName);
    const dueDateErrors = observeAndCompute(dueDate, validateDueDate);
    const allErrors = combineAndObserve(nameErrors, dueDateErrors);
    const isValid = observeAndCompute(allErrors, hasNoErrors);
    const saving = new ObservableVar();
    const saveError = new ObservableVar();

    const resetFields = () => {
        name.set('');
        dueDate.set(null);
    }

    const onBefore = () => {
        saving.set(true);
    }

    const onSuccess = (task) => {
        tasks.push(task);
        resetFields();
        showModal.set(false);
    }

    const onFailure = (error) => {
        saveError.set(error);
    }

    const onDone = () => {
        saving.set(false);
    }

    const save = () => {
        api.create('Tasks',
            {
                name: name.value,
                dueDate: dueDate.value
            },
            onBefore,
            onSuccess,
            onFailure,
            onDone
        );
    }

    return (
        element('div', {bind: [[showModal, hideWhenFalse]]},
            element('h3', {textContent: 'Add Task'}),
            InputWithValidation(
                'text', 
                'name', 
                name, 
                nameErrors
            ),
            InputWithValidation(
                'date', 
                'due', 
                dueDate, 
                dueDateErrors
            ),
            DomainInput(domains),
            ModalFooter(
                save,
                saving,
                isValid,
                showModal
            )
        )
    )
}

function TaskList(tasks, domains) {

    const isAddingTask = new ObservableVar(false);

    const openAddTaskModal = () => {
        isAddingTask.set(!isAddingTask.value);
    }

    const toggleButtonText = (el, value) => {
        el.textContent = value ? 'Nevermind' : 'Add Task';
    }

    return (
        element('div', {},
            element('h2', {textContent: 'Tasks'}),
            element('div', {},
                element('button', {
                    onclick: openAddTaskModal,
                    bind: [[isAddingTask, toggleButtonText]]
                }),
            ),
            element('div', {},
                bind(tasks, (value) =>
                    repeat(value, (task) => 
                        element('div', {textContent: task.name})
                    )
                )
            ),
            TaskAddModal(isAddingTask, tasks, domains)
        )
    )
}

function Dashboard(userdata) {
    
    const tasks = new ObservableArray(userdata.tasks);
    const events = new ObservableArray(userdata.events);
    const domains = new ObservableArray(userdata.domains);

    return (
        element('div', {},
            TaskList(tasks, domains)
        )
    )
}

export function App() {

    const loading = new ObservableVar(true);
    const userdata = new ObservableVar();    

    getUserData().then((value) => {
        loading.set(false);
        userdata.set(value);
    });

    return (
        element('div', {},
            element('div', {
                textContent: 'Loading...',
                bind: [[loading, hideWhenFalse]]
            }),
            bind(userdata, (value) => 
                value ? Dashboard(value) : element('div')
            )
        )   
    )
}  

