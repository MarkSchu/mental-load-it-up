// from year-day-month to Date
// JS is messed up here
// you have to change the yyyy-dd-mm format to dd-mm-yyyy
// of new Date will be a day off. Weird.
export function convertToUTCStr(dueDate) {
    const list = dueDate.split('-');
    const date = new Date(`${list[1]}-${list[2]}-${list[0]}`);
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    return date.toUTCString();
}

export function getDaysUntil (dueDate) {
    let dayMS = 86400000;
    let dueDateMS = (new Date(dueDate)).getTime();
    let today = new Date();
    today.setMilliseconds(0);
    today.setSeconds(0);
    today.setMinutes(0);
    today.setHours(0);
    let todayMS = today.getTime();
    return (dueDateMS - todayMS) / dayMS;
}