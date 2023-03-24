import { element } from 'utils/dom.js';
import { InputWithValidation } from 'components/common/input-with-validation.js';
import { SubmissionModal } from 'components/common/submission-modal.js';
import { createFieldObservables } from 'utils/observable.js';
import { EVENTS } from 'data/collection-names.js';
import state from 'data/state.js';


const validateName = () => {
    return [];
}
const validateStartDate = () => {
    return [];
}
const validateEndDate = () => {
    return [];
}
const validateDomain = () => {
    return [];
}

export function CreateEventModal(isModalOpen, userData) {
    
    const [
        name,
        startDate,
        endDate,
        domain,
        nameErrors,
        startDateErrors,
        endDateErrors,
        domainErrors,
        isValid
    ] = createFieldObservables(
        validateName,
        validateStartDate,
        validateEndDate,
        validateDomain
    );

    const resetFields = () => {
        name.set('');
        startDate.set(null);
        endDate.set(null);
        domain.set(null);
    }
    
    const createEvent = () => {
        return state.create(EVENTS, {
            name: name.value,
            startDate: startDate.value,
            endDate: startDate.value
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
                label: 'starts', 
                field: startDate,
                errors: startDateErrors
            }),
            InputWithValidation({
                type: 'date', 
                label: 'ends', 
                field: endDate,
                errors: endDateErrors
            })
        )
    );

    resetFields();

    return (
        SubmissionModal({
            title: 'Add Event',
            isModalOpen,
            form,
            isValid,
            onSubmit: createEvent,
            resetFields
        })
    )
}
