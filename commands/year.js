'use strict';

const pt = require('periodic-table');

const capitalizeFirstLetter = str => str[0].toUpperCase() + str.slice(1);

module.exports = ({ reply, message }) => {
    let formula = message.text.split(/\s+/);
    formula = formula.splice(1, formula.length).join(' ');
    formula ? formula = capitalizeFirstLetter(formula) : formula = ' ';

    if ('object' === typeof pt.symbols[formula])
        if ('Ancient' === pt.symbols[formula].yearDiscovered)
            return reply(formula + ' is known since ancient times');
        else
            return reply(formula + ' was discovered in ' +
                pt.symbols[formula].yearDiscovered);
    else if ('object' === typeof pt.elements[formula])
        if ('Ancient' === pt.elements[formula].yearDiscovered)
            return reply(formula + ' is known since ancient times');
        else
            return reply(formula + ' was discovered in ' +
                pt.elements[formula].yearDiscovered);
    else
        return reply('Not found!');
}