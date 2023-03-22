import { element } from 'utils/dom.js';

export function DashboardMenu({
    selectedTab
}) {

    const selectTab = (e) => {
        selectedTab.set(e.target.value);
    }

    const styleTab = (el, value) => {
        // el.value === value ? el.classList.add('selected') : el.classList.remove('selected'); 
    }

    return (
        element('div', {className: 'menu'},
            element('div', {
                textContent: 'Tasks',
                value: 'tasks',
                onclick: selectTab,
                bind: [[selectedTab, styleTab]]
            }),
            element('div', {
                textContent: 'Events',
                value: 'events',
                onclick: selectTab,
                bind: [[selectedTab, styleTab]]
            }),
            element('div', {
                textContent: 'Domains',
                value: 'domains',
                onclick: selectTab,
                bind: [[selectedTab, styleTab]]
            })
        )
    );
}