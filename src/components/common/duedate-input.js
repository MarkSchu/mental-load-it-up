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
        input.showPicker();
    }

    const displayDate = (iso) => {
        display.textContent = formatDate(iso);
    }

    const updateDisplay = (e) => {
        displayDate(inputToISO(e.target.value));
    }

    return (
        element('div', {
            className: 'dateinput input',
            onclick: handleClick
        },
            display = element('div', {
                className: 'dueinput-display',
                textContent: formatDate(thing.dueDate)
            }),
            input = element('input', { 
                    type: 'date', 
                    name: 'dueDate',
                    value: isoToInput(thing.dueDate),
                    onchange: updateDisplay
            }),
        )
    )
}