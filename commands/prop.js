'use strict';

const pubchem = require('pubchem-access').domain('compound');
const { commandText } = require('../utils');

module.exports = ({ reply, message }) => {
	pubchem
		.setName(commandText(message))
		.getProperties([
			'IUPACName',
			'MolecularWeight',
			'MolecularFormula',
			'CanonicalSMILES'
		])
		.execute(data =>
			reply(
				'IUPAC name: ' + data.IUPACName +
				',\nMW: ' + data.MolecularWeight +
				',\nFormula: ' + data.MolecularFormula +
				', \nSMILES: ' + data.CanonicalSMILES));
};
