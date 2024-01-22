import { element } from 'utils/dom.js';
import { alerts } from 'data/alerts.js';
import { ObservableBool } from 'utils/observable.js';

export const Alert = (msg) => {   

    const handleLoading = (el, value) => {
        if (value) {
            el.style.zIndex = 2;
            el.style.opacity = 1;
        } else {
            el.style.zIndex = -1;
            el.style.opacity = 0;
        }
    }

    const display = new ObservableBool();

    const handleEvent = (el, event, data) => {
        console.log(el, event, data)
        if (event === 'request') {
            display.true()
        }
        if (event === 'response') {
            if (data.type === 'error') {
                // show error 
            } else {
                // hide
            }
        }
    }

    const handleClick = () => {
        display.false();
    }
    
    return (
        element('div', {
            className: 'alert',
            listen: [[alerts, handleEvent]],
            // bind: [alerts, handleEvent]
        },
            element('div', {className: 'spinner'}),
            element('h2', {
                className: 'h4',
                textContent: 'Saving...',
            })
        )
    );
}


// export const Alert = (msg) => {   

//     const handleLoading = (el, value) => {
//         if (value) {
//             el.style.zIndex = 2;
//             el.style.opacity = 1;
//         } else {
//             el.style.zIndex = -1;
//             el.style.opacity = 0;
//         }
//     }

//     const handleClick = () => {
//         state.alert.set(null);
//     }
    
//     return (
//         element('div', {
//             className: 'loader',
//             bind: [[state.alert, handleLoading]]
//         },
//             element('h2', {
//                 className: 'h4',
//                 textContent: 'Uh Oh!',
//             }),
//             element('p', {textContent: 'Sorry, that user name is already in use!'}),
//             element('button', {
//                 className: 'button button-primary',
//                 textContent: 'Close',
//                 onclick: handleClick
//             })
//         )
//     );
// }
