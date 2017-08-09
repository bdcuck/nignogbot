'use strict';

const pt = require('periodic-table');

const isObject = val => typeof val === 'object';
const capitalizeFirstLetter = str => str[0].toUpperCase() + str.slice(1);

module.exports = ({ reply, message }) => {
    let formula = message.text.split(/\s+/);
    formula = formula.splice(1, formula.length).join(' ');
    formula ? formula = capitalizeFirstLetter(formula) : formula = ' ';

    let found;
    found = isObject(pt.symbols[formula]) ? pt.symbols[formula].yearDiscovered : found;
    found = isObject(pt.elements[formula]) ? pt.elements[formula].yearDiscovered : found;

    if (found) {
        reply('Ancient' === found ?
            `${formula} is known since ancient times` :
            `${formula} was discovered in ${found}`);
    } else
        return reply('Not found!');
};