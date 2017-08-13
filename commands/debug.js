'use strict';

const { commandArgs, commandText } = require('../utils');

module.exports = ({ reply, message }) => reply(`Args: ${commandArgs(message)}
Text: ${commandText(message)}

Aids:
${message}
`);
