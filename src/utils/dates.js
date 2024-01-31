export const compareCreationDate = (a, b) => {
    const aDate = new Date(a.creationDate);
    const bDate = new Date(b.creationDate);
    if (aDate > bDate) {
        return 1;
    }
    if (aDate< bDate) {
        return -1;s
    }
    return 0;
}

export const compareDueDate = (a, b) => {
    const aDate = new Date(a.dueDate);
    const bDate = new Date(b.dueDate);
    if (aDate > bDate) {
        return 1;
    }
    if (aDate< bDate) {
        return -1;s
    }
    return 0;
}

export const sortByDates = (collection) => {
    const withoutDueDates = collection.filter((item) => !item.dueDate);
    const withDueDates = collection.filter((item) => !!item.dueDate);
    withoutDueDates.sort(compareCreationDate);
    withDueDates.sort(compareDueDate);
    const sorted =  withoutDueDates.concat(withDueDates);
    return sorted;
}

export const getDateInputValue = (utc) => {
    const d = new Date(utc);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export const dateInputToUTC = (yyyy_mm_dd) => {
    if (!yyyy_mm_dd) {
        return '';
    }
    const [yyyy, mm, dd] = yyyy_mm_dd.split('-');
    if (!yyyy || !mm || !dd) {
        return '';
    }
    const date = new Date(`${dd}-${mm}-${yyyy}`);
    return date.toUTCString();
}

export const utcToDateInput = (utc) => {
    if (!utc) {
        return '';
    }
    const date = new Date(utc);
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    if (mm < 10) {
        mm = '0' + mm;
    }
    let dd = date.getDate();
    if (dd < 10) {
        dd = '0' + dd;
    }
    return `${yyyy}-${mm}-${dd}`;
}

export const getDaysUntilDeadline = (utc) => {
    const today = new Date();
    const dueDate = new Date(utc);
    const diff = dueDate.getTime() - today.getTime();
    return Math.round(diff / (1000 * 3600 * 24));
}