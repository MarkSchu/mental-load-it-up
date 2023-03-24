import { InputWithValidation } from 'components/common/input-with-validation.js';
import { SubmissionModal } from 'components/common/submission-modal.js';
import { createFieldObservables } from 'utils/observable.js';
import { DOMAINS } from 'data/collection-names.js';
import state from 'data/state.js';

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

    const resetFields = () => {
        name.set('');
    }

    const createDomain = () => {
        return state.create(DOMAINS, {
            name: name.value
        });
    }

    const form = (
        InputWithValidation({
            type: 'text', 
            label: 'name', 
            field: name,
            errors: nameErrors
        })
    );

    resetFields();

    return SubmissionModal({
        title: 'Add Domain',
        isModalOpen,
        form,
        isValid,
        onSubmit: createDomain,
        resetFields
    });
}