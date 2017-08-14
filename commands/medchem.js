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
            'IUPAC name: ' + data.IUPACName +
            ',\nXLogP: ' + data.XLogP +
            ',\nComplexity: ' + data.Complexity +
            ', \nH-bond donors: ' + data.HBondDonorCount +
            ', \nH-bond acceptors: ' + data.HBondAcceptorCount +
            ', \nRotatable bonds: ' + data.RotatableBondCount +
            ', \nTopological polar surface area: ' + data.TPSA));
}
