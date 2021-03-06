'use strict';

const pt = require('periodic-table');

const capitalizeFirstLetter = str => str[0].toUpperCase() + str.slice(1);

module.exports = ({ reply, message }) => {
	let formula = message.text.split(/\s+/);
	formula = formula.splice(1, formula.length).join(' ');
	formula ? formula = capitalizeFirstLetter(formula) : formula = ' ';

	if (pt.symbols[formula])
		return reply('The electronic configuration ' + formula +
					' is ' + pt.symbols[formula].electronicConfiguration);
	else if (pt.elements[formula])
		return reply('The electronic configuration ' + formula +
					' is ' + pt.elements[formula].electronicConfiguration);

	return reply('Not found!');

};

module.exports.help = 'Electronic configuration of an element, e.g. /config Hg';
