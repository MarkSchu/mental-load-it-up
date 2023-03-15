import { element } from 'utils/dom.js';
import { InputWithValidation } from 'components/common/input-with-validation.js';
import { SubmissionModal } from 'components/common/submission-modal.js';
import { createFieldObservables } from 'utils/observable.js';

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
    )
    
    const create = (handlers) => {
        api.create('Events', {
            name: name.value,
            startDate: startDate.value,
            endDate: startDate.value
        }, handlers);
    }

    const success = (instance) => {
        userData.events.push(instance);
        name.set('');
        startDate.set(null);
        endDate.set(null);
        domain.set(null);
        isModalOpen.set(false);
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
                type: 'text', 
                label: 'starts', 
                field: startDate,
                errors: startDateErrors
            }),
            InputWithValidation({
                type: 'text', 
                label: 'ends', 
                field: endDate,
                errors: endDateErrors
            })
        )
    );

    return (
        SubmissionModal({
            title: 'Add Event',
            isModalOpen,
            form,
            isValid,
            callback: create,
            success
        })
    )
}
