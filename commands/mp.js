'use strict';

const pt = require('periodic-table');
const util = require('periodic-table/util');

const capitalizeFirstLetter = str => str[0].toUpperCase() + str.slice(1);

module.exports = ({ reply, message }) => {
	let formula = message.text.split(/\s+/);
	formula = formula.splice(1, formula.length).join(' ');
	formula ? formula = capitalizeFirstLetter(formula) : formula = ' ';

	if (pt.symbols[formula]) {
		const celsius =
												Number(pt.symbols[formula].meltingPoint) - 273;
		return reply('The melting point of ' + formula + ' is ' +
												pt.symbols[formula].meltingPoint + ' K or ' +
												celsius + 'ºC');
	} else if (pt.elements[formula]) {
		const celsius =
												Number(pt.elements[formula].meltingPoint) - 273;
		return reply('The melting point of ' + formula + ' is ' +
												pt.elements[formula].meltingPoint + ' K or ' +
												celsius + 'ºC');
	}
	return reply('Not found!');

};

module.exports.help = 'Melting point of element';
