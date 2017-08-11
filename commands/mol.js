'use strict';

const getPubchemImage = require('../modules/pubchemimage.js');

// Appearantly there is a molecule found on just /mol, 
// so I had to replace empty /mol messages with dumbfuck to give an error. 
// This will break if someone invents a molecule and calls it dumbfuck
const getName = (msg) => msg.text.substr(msg.text.indexOf(' ') + 1) !== msg.text ?
	msg.text.substr(msg.text.indexOf(' ') + 1) : 'dumbfuck';

module.exports = ({ reply, message }) => getPubchemImage(getName(message)).then(image => reply(image)).catch(() =>
	reply('Structure not found'));