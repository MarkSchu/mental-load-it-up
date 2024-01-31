import { element, repeat } from 'utils/dom.js';

export function DatePage() {

    const date = new Date();
    const rows = [
        ['date.toDateString()', date.toDateString()],
        ['date.toGMTString()', date.toGMTString()],
        ['date.toJSON()', date.toJSON()],
        ['date.toLocaleDateString()', date.toLocaleDateString()],
        ['date.toLocaleString()', date.toLocaleString()],
        ['date.toLocaleTimeString()', date.toLocaleTimeString()],
        ['date.toString()', date.toString()],
        ['date.toTimeString()', date.toTimeString()],
        ['date.toUTCString()', date.toUTCString()],
        ['date.getDate()', date.getDate()],
        ['date.getDay()', date.getDay()],
        ['date.getFullYear()', date.getFullYear()],
        ['date.getHours()', date.getHours()],
        ['date.getMilliseconds()', date.getMilliseconds()],
        ['date.getMinutes()', date.getMinutes()],
        ['date.getMonth()', date.getMonth()],
        ['date.getSeconds()', date.getSeconds()],
        ['date.getTime()', date.getTime()],
        ['date.getTimezoneOffset()', date.getTimezoneOffset()],
        ['date.getUTCDate()', date.getUTCDate()],
        ['date.getUTCDay()', date.getUTCDay()],
        ['date.getUTCFullYear()', date.getUTCFullYear()],
        ['date.getUTCHours()', date.getUTCHours()],
        ['date.getUTCMilliseconds()', date.getUTCMilliseconds()],
        ['date.getUTCMinutes()', date.getUTCMinutes()],
        ['date.getUTCMonth()', date.getUTCMonth()],
        ['date.getUTCSeconds()', date.getUTCSeconds()],
        ['date.getYear()', date.getYear()],
    ];
    

    return (
        element('div', {},
            element('table', {},
                repeat(rows, ([x, y]) => 
                    element('tr', {},
                        element('td', {textContent: x}),
                        element('td', {textContent: y})
                    )
                )
            )
        )
    )
}