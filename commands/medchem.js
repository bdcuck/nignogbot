'use strict';

const pubchem = require('pubchem-access').domain('compound');
const { commandText } = require('../utils');

module.exports = ({ reply, message }) => {
	pubchem
		.setName(commandText(message))
		.getProperties([
			'IUPACName',
			'XLogP',
			'Complexity',
			'HBondDonorCount',
			'HBondAcceptorCount',
			'RotatableBondCount',
			'TPSA'
		])
		.execute(data =>
			reply(
                `IUPAC name: ${data.IUPACName},
                XLogP: ${data.XLogP},
                Complexity: ${data.Complexity},
                H-bond donors: ${data.HBondDonorCount},
                H-bond acceptors: ${data.HBondAcceptorCount},
                Rotatable bonds: ${data.RotatableBondCount},
                Topological polar surface area: ${data.TPSA}`)
		);
};

module.exports.help = 'Some MedChem properties for a compound. Example usage: /medchem methamphetamine';
