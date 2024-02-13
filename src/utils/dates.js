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

export const inputToISO = (str) => {
    if (!str) return '';
    return `${str}T23:59:59`;   // due time is 11:59 pm and 59 seconds
}

export const isoToInput = (iso) => {
    if (!iso) return '';
    return iso.split('T')[0];
}

export const isoToDate = (iso) => {
    if (!iso) return '';
    const date = new Date(iso);
    return date.toLocaleDateString();
}

export const getDaysUntilDeadline = (iso) => {
    const today = new Date();
    const dueDate = new Date(iso);
    const diff = dueDate.getTime() - today.getTime();
    return Math.round(diff / (1000 * 3600 * 24));
}