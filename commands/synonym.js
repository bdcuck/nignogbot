'use strict';

const pubchem = require('pubchem-access').domain('compound');
const { commandText } = require('../utils');

module.exports = ({ reply, message }) => {
	pubchem
		.setName(commandText(message))
		.getNames(5)
		.execute(data =>
			reply(
				data[0] + ', ' +
				data[1] + ', ' +
				data[2] + ', ' +
				data[3] + ', ' +
				data[4]));
};

module.exports.help = 'Give up to 5 synonyms for a compound. If you see c,o,m,p,o it means you screwed up';
