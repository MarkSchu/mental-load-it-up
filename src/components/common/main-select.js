export function MainSelection(mainSelection) {

    const onclick = (e) => {
        mainSelection.set(e.target.dataset.value);
    }

    const showSelection = (el, value) => {
        el.style.fontWeight = el.dataset.value === value
            ? 'bold'
            : 'initial';
    }
    
    return (
        element('div', {className: 'main-selection'},
            element('div', {
                className: 'main-option',
                textContent: 'Tasks',
                'data-value': 'tasks',
                bind: [[mainSelection, showSelection]],
                onclick
            }),
            element('div', {
                className: 'main-option',
                textContent: 'Events',
                'data-value': 'events',
                bind: [[mainSelection, showSelection]],
                onclick
            })
        )
    )
}

// .dash-footer .main-selection {
//     width: 100%;
//     display: flex;
//     justify-content: space-around;
//     background-color: white;
//     border-top: 1px solid #ccc;
// }

// .dash-footer .main-option {
//     height: 4rem;
//     width: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     cursor: pointer;
// }
