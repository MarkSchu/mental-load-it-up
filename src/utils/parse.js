export const getTypeFromSelection = (selection) => {
    return selection.value.split('-')[1];
}

export const getDomainIdFromSelection = (selection) => {
    const [domainSelection] = selection.value.split('-');
    return (domainSelection === 'all' || domainSelection === 'none') 
    ? ''  
    : domainSelection;
}

