import { element, bindrepeat } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';

export function DashboardList({
    title, cta, collection, modal, modalProps, listItemComponent
}) {
    
    const showModal = new ObservableBool(false);

    const toggleText = (el, value) => {
        el.textContent = value 
        ? 'Nevermind' 
        : cta;
    }

    return (
        element('div', {},
            element('h2', {textContent: title}),
                element('div', {},
                    element('button', {
                        onclick: () => showModal.toggle(),
                        bind: [[showModal, toggleText]]
                    }),
                ),
                element('div', {},
                    bindrepeat(collection, (item) => 
                        listItemComponent(item)
                )
            ),
            modal(
                showModal, 
                modalProps.tasks,
                modalProps.domains
            )
        )
    )
}