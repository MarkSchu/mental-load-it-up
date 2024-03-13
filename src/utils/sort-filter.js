export const filterByDomain = (list, domain) => {
    if (domain === 'all') {
        return list;
    } 
    else if (domain === 'none' ) {
        return list.filter(item => !item.domain);
    } 
    else {
        return list.filter(item => item.domain === domain);
    }
}

export const sortAlphabetically = (list) => {
    return list.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });
}
