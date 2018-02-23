'use strict';

const { commandArgs, commandText, id } = require('../utils');

module.exports = ({ reply, message }) => reply(`Args: ${commandArgs(message)}
Text: ${commandText(message)}
ID: ${id(message)}

Aids:
${JSON.stringify(message)}
`);

module.exports.help = 'Useless message info';
