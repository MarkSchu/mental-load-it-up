import { element } from 'utils/dom.js';
import { InputWithValidation } from 'components/common/input-with-validation.js';
import { SubmissionModal } from 'components/common/submission-modal.js';
import { createFieldObservables } from 'utils/observable.js';
import api from 'utils/api.js';


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

    const reset = () => {
        name.set('');
        startDate.set(null);
        endDate.set(null);
        domain.set(null);
    }
    
    const create = (handlers) => {
        api.create('Events', {
            name: name.value,
            startDate: startDate.value,
            endDate: startDate.value
        }, handlers);
    }

    const success = (instance) => {
        userData.events.push(instance);
        console.log('boop', instance)
        console.log(userData)
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

    reset();

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
