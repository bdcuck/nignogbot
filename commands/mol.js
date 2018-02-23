'use strict';

const getPubchemImage = require('../modules/pubchemimage.js');
const { commandText } = require('../utils');

module.exports = ({ reply, message }) => commandText(message) ? getPubchemImage(commandText(message)).then(image => reply(image)).catch(() =>
	reply('Structure not found')) : reply('Input a molecule name dumbass');

module.exports.help = '2D molecular structure. Example usage: /mol tetraethylgermane';
