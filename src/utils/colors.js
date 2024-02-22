const colors = [
    '#F72586',
    '#7109B6',
    '#3A0CA3',
    '#4460EF',
    '#4BC9F1',
    '#45E3CD'
];

let previousColor;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomColor = () => {
    let color = colors[getRandomInt(0, colors.length)];
    if (color === previousColor) {
        color = getRandomColor();
    }
    return color;
}