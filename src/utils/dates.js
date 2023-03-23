// from year-day-month to Date
// JS is messed up here
// you have to change the yyyy-dd-mm format to dd-mm-yyyy
// of new Date will be a day off. Weird.
export function formatDate(dueDate) {
    if (!dueDate) return;
    const list = dueDate.split('-');
    return `${list[1]}/${list[2]}/${list[0]}`;
}

export function getDaysUntil (dueDateStr) {
    const dayMS = 86400000;
    const today = new Date();
    const dueDate = new Date(dueDateStr);
    const diff = dueDate.getTime() - today.getTime();
    return Math.ceil(diff / dayMS);
}