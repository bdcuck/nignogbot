'use strict';

const pt = require('periodic-table');

const capitalizeFirstLetter = str => str[0].toUpperCase() + str.slice(1);

module.exports = ({ reply, message }) => {
	let formula = message.text.split(/\s+/);
	formula = formula.splice(1, formula.length).join(' ');
	formula ? formula = capitalizeFirstLetter(formula) : formula = ' ';

	if (pt.symbols[formula])
		return reply('The density of ' + formula + ' is ' +
					pt.symbols[formula].density + ' g/cm^3');
	else if (pt.elements[formula])
		return reply('The density of ' + formula + ' is ' +
					pt.elements[formula].density + ' g/cm^3');

	return reply('Not found!');

};
