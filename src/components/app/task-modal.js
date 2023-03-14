import { element } from 'utils/dom.js';
import { 
    ObservableVar, 
    observeAndCompute,
    combineAndObserve,
    ObservableBool 
} from 'utils/observable.js';
import { InputWithValidation } from 'components/common/input-with-validation.js';
import { Modal } from 'components/common/modal.js';
import { hasNoErrors, validate, isRequired, isLongerThan } from 'utils/validation.js';
import api from 'utils/api.js';

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

export function TaskModal(showModal, tasks, domains) {

    const name = new ObservableVar('');
    const dueDate = new ObservableVar(null);
    const nameErrors = observeAndCompute(name, validateName);
    const dueDateErrors = observeAndCompute(dueDate, validateDueDate);

    const submit = (handlers) => {
        api.create('Tasks', {
            name: name.value,
            dueDate: dueDate.value
        }, handlers);
    }

    const success = (task) => {
        tasks.push(task);
        name.set('');
        dueDate.set(null)
    }

    return (
        Modal({
            title: 'Add Taks',
            showModal,
            errors: combineAndObserve(nameErrors, dueDateErrors),
            onSubmit: submit,
            onSuccess: success
        },
            element('div', {},
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
                )
            )
        )    
    )
}


  // const isValid = observeAndCompute(allErrors, hasNoErrors);
    // const isSubmitting = new ObservableBool(false);
    // const errorMessage = new ObservableVar(null);

    // const resetFields = () => {
    //     name.set('');
    //     dueDate.set(null);
    // }

    // const submit = () => {
    //     isSubmitting.toggle();
    //     api.create('Tasks', {
    //         name: name.value,
    //         dueDate: dueDate.value
    //     },
    //         {
    //             success: (task) => {
    //                 tasks.push(task);
    //                 resetFields();
    //                 isSubmitting.toggle();
    //                 showModal.toggle();
    //             },
    //             failure: (code) => {
    //                 errorMessage.set(code);
    //             },
    //             done: () => {
    //                 isSubmitting.toggle();
    //             }
    //         }
    //     )
    // }