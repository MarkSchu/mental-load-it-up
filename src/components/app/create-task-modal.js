import { element } from 'utils/dom.js';
import { InputWithValidation } from 'components/common/input-with-validation.js';
import { SubmissionModal } from 'components/common/submission-modal.js';
import { createFieldObservables } from 'utils/observable.js';
import { TASKS } from 'data/collection-names.js';
import { formatDate } from 'utils/dates.js';
import state from 'data/state.js';


const validateName = () => {
    return [];
}
const validateDueDate = () => {
    return [];
}

export function CreateTaskModal(isModalOpen) {
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

    const resetFields = () => {
        name.set('');
        dueDate.set(null);
    }

    const createTask = () => {
        return state.create(TASKS, {
            name: name.value,
            dueDate: formatDate(dueDate.value)
        });
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

    resetFields();

    return SubmissionModal({
        title: 'Add Task',
        isModalOpen,
        form,
        isValid,
        onSubmit: createTask,
        resetFields,
    });
}