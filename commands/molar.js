'use strict';

const pt = require('periodic-table');
const util = require('periodic-table/util');

const capitalizeFirstLetter = str => str[0].toUpperCase() + str.slice(1);

module.exports = ({ reply, message }) => {
    let formula = message.text.split(/\s+/);
    formula = formula.splice(1, formula.length).join(' ');
    formula ? formula = capitalizeFirstLetter(formula) : formula = ' ';

    return reply('Not found!');
    
}

