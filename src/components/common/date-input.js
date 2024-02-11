import { element } from 'utils/dom.js';
import { inputToISO, isoToDate, isoToInput } from 'utils/dates.js';

export function DateInput(name, iso) {

    let display;
    let input;

    const showDatePicker = () => {
        input.showPicker();
    }

    const showDate = (e) => { 
        const iso = inputToISO(e.target.value);
        display.textContent = isoToDate(iso);
    }

    return (
        element('div', {
            className: 'input date-input',
            onclick: showDatePicker
        },
            display = element('div', {
                textContent: isoToDate(iso)}),
            input = element('input', {
                type: "date",
                style: {opacity: 0, position: 'absolute'},
                onchange: showDate,
                name,
                value: isoToInput(iso)
            })
        )
    )
}