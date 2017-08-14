'use strict';

const pubchem = require('pubchem-access').domain('compound');
const { commandText } = require('../utils');

module.exports = ({ reply, message }) => {
	pubchem
		.setName(commandText(message))
		.getCas()
		.execute((data, status) =>
			1 === status
				? reply(data + ' ')
				: reply(data + ', status: ' + status));
};
