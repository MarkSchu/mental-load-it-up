import { element, bindrepeat } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';

export function DashboardList({
    title,
    model,
    userData,
    createModal
}) {

    const isModalOpen = new ObservableBool(false);

    const toggleButtonText = (el, value) => {
        el.textContent = value ? 'cancel' : 'add'
    }

    const toggleModalOpen = () => {
        isModalOpen.toggle();
    }
    
    return (
        element('div', {},
            element('h2', {textContent: title}),
            element('button', {
                bind: [[isModalOpen, toggleButtonText]],
                onclick: toggleModalOpen
            }),
            bindrepeat(userData[model], (instance) =>
                element('div', {textContent: instance.name})
            ),
            createModal(isModalOpen, userData)
        )
    )
}