import { element, bindrepeat } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { repeat } from 'utils/binders.js';

export function DashboardList({
    title,
    model,
    userData,
    createModal
}) {

    const isModalOpen = new ObservableBool(false);
    const list = userData[model];

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
            createModal(isModalOpen, userData),
            element('div', {
                bind:[[list, (el, value) =>
                    repeat(el, value, (instance) => 
                        element('div', {textContent: instance.name}
                    )
                )]]
            }),
            element('div', {
                textContent: 'nothing here yet...',
                bind: [[list, (el, value) => (el.hidden = !!value.length)]]
            })
        )
    )
}