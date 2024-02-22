import { element } from 'utils/dom.js';
import { isoToInput, inputToISO } from 'utils/dates.js';

export function DueDateInpout(thing) {

    let display;
    let input;

    const formatDate = (iso) => {
        if (!iso) {
            return 'mm/dd/yyyy';
        }
        const date = new Date(iso);
        return date.toLocaleDateString();
    }

    const handleClick = () => {
        console.log('i mean...')
        input.click();
    }

    const displayDate = (iso) => {
        display.textContent = formatDate(iso);
    }

    const updateDisplay = (e) => {
        displayDate(inputToISO(e.target.value));
    }

    return (
        element('div', {
            className: '',
            style: {border: '3px solid red'},
            onclick: handleClick
        },
            display = element('div', {
                style: {border: '3px solid green'},
                className: '',
                textContent: formatDate(thing.dueDate)
            }),
            input = element('input', { 
                    style: {
                        border: '3px solid purple',
                        width: '100%'
                    },
                    type: 'date', 
                    name: 'dueDate',
                    value: isoToInput(thing.dueDate),
                    onchange: updateDisplay
            }),
        )
    )
}