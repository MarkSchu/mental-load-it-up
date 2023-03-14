export const hasNoErrors = (arrays) => {
    return arrays?.flat().length === 0;
}

export const isRequired = (value) => {
    return !!value || 'isRequired';
}

export const isLongerThan = (number) => (value) => {
    return value.length > number || 'isLongerThan';
}

export const validate = (...args) => {
    return args.filter(item => item !== true);
}
