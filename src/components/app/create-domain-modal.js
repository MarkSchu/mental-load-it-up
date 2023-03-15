import { InputWithValidation } from 'components/common/input-with-validation.js';
import { SubmissionModal } from 'components/common/submission-modal.js';
import { createFieldObservables } from 'utils/observable.js';
import api from 'utils/api.js';

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

    const reset = () => {
        name.set('');
    }

    const create = (handlers) => {
        api.create('Domains', {
            name: name.value
        }, handlers);
    }

    const success = (instance) => {
        userData.domains.push(instance);
        isModalOpen.set(false);
        reset();
    }

    const form = (
        InputWithValidation({
            type: 'text', 
            label: 'name', 
            field: name,
            errors: nameErrors
        })
    );

    reset();

    return SubmissionModal({
        title: 'Add Domain',
        isModalOpen,
        form,
        isValid,
        callback: create,
        success
    });
}