import { element, boolToInlineDisplay } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { collections } from 'data/collection.js';
import { EditTaskForm } from 'components/dash/task-edit-form.js';
import { getDaysUntilDeadline } from 'utils/dates.js';




export function Domain(domain) {

    const showModal = new ObservableBool(false);
   
    return (
        element('div', {className: 'domain'},
            // EditDomainForm(domain, showModal)
        )
    )
}
