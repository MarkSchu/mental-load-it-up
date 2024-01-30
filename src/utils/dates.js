export function getDateInputValue(utc) {
    const d = new Date(utc);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

