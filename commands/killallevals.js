'use strict';

const { commandArgs, commandText, id } = require('../utils');
const { vm } = require('../modules/vmState.js');
const config = require('../config');

module.exports = ({ reply, message }) => {
	if (id(message) !== config.telegram.creator) {
		reply('Not authorized');
	} else {
		vm.destroyAll();
		reply('Killed all processes');
	}
};
