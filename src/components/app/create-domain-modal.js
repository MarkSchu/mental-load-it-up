import { InputWithValidation } from 'components/common/input-with-validation.js';
import { SubmissionModal } from 'components/common/submission-modal.js';
import { createFieldObservables } from 'utils/observable.js';

const validateName = () => {
    return [];
}

export function CreateDomainModal(isModalOpen, userData) {

    const [
        name,
        nameErrors,
        isValid
    ] = createFieldObservables(
        validateName
    );

    const create = (handlers) => {
        api.create('Domains', {
            name: name.value
        }, handlers);
    }

    const success = (instance) => {
        userData.domains.push(instance);
        name.set('');
        isModalOpen.set(false);
    }

    const form = (
        InputWithValidation({
            type: 'text', 
            label: 'name', 
            field: name,
            errors: nameErrors
        })
    );

    return SubmissionModal({
        title: 'Add Domain',
        isModalOpen,
        form,
        isValid,
        callback: create,
        success
    });
}