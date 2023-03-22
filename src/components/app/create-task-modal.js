import { element } from 'utils/dom.js';
import { InputWithValidation } from 'components/common/input-with-validation.js';
import { SubmissionModal } from 'components/common/submission-modal.js';
import { createFieldObservables } from 'utils/observable.js';
import api from 'utils/api.js';
import { convertToUTCStr } from 'utils/dates.js';


const validateName = () => {
    return [];
}
const validateDueDate = () => {
    return [];
}

export function CreateTaskModal(isModalOpen, userData) {
    const [
        name,
        dueDate,
        nameErrors,
        dueDateErrors,
        isValid
    ] = createFieldObservables(
        validateName,
        validateDueDate
    );

    const reset = () => {
        name.set('');
        dueDate.set(null);
    }

    const create = (handlers) => {
        api.create('Tasks', {
            name: name.value,
            dueDate: dueDate.value ? convertToUTCStr(dueDate.value) : null
        }, handlers);
    }

    const success = (instance) => {
        userData.tasks.push(instance);
        isModalOpen.set(false);
        reset();
    }

    const form = (
        element('div', {}, 
            InputWithValidation({
                type: 'text', 
                label: 'name', 
                field: name,
                errors: nameErrors
            }),
            InputWithValidation({
                type: 'date',
                label: 'due', 
                field: dueDate,
                errors: dueDateErrors
            })
        )
    );

    reset();

    return SubmissionModal({
        title: 'Add Task',
        isModalOpen,
        form,
        isValid,
        callback: create,
        success
    });
}