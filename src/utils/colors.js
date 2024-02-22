import { collections } from 'state/collection.js';


const colors = [
    '#f72585',
    '#b5179e',
    '#7209b7',
    '#560bad',
    '#480ca8',
    '#3a0ca3',
    '#3f37c9',
    '#4361ee',
    '#4895ef',
    '#4cc9f0',
    '#d9ed92',
    '#b5e48c',
    '#99d98c',
    '#76c893',
    '#52b69a',
    '#34a0a4',
    '#168aad',
    '#1a759f',
    '#1e6091',
    '#184e77'
    
];

let colorsInUse = [];
let colorsAvailable = [];

export const setColors = (domain) => {
    domain.forEach((domain) => {
        if (domain.color) {
            colorsInUse.push(domain.color);
        }
    });
    colorsAvailable = colors.filter(color => !colorsInUse.includes(color));
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomColor = () => {
    const i = getRandomInt(0, colorsAvailable.length);
    return colorsAvailable[i];
}

collections.domains.onEmit((domains) => {
    setColors(domains);
});
