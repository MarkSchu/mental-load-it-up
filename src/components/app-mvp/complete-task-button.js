import { element } from 'utils/dom.js';
import state from 'data/state.js';
import { disable } from 'utils/binders.js';
import { ObservableBool } from 'utils/observable.js';

export const CompleteTaskButton = (task) => {

    const disableButton = new ObservableBool(false);

    const onclick = () => {
        disableButton.true();
        state.tasks.updateById(task._id, {
            complete: !task.complete
        }).then(() => disableButton.false());
    }

    return (
        element('button', { 
            textContent: task.complete ? 'Not Done' : 'Done', 
            onclick,
            bind: [[disableButton, disable]]
        })
    )
}