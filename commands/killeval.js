'use strict';

const { commandArgs, commandText, id } = require('../utils');
const { vm } = require('../modules/vmState.js');

module.exports = ({ reply, message }) => {
	if (vm.exists(id(message))) {
		vm.destroy(id(message));
		reply('Killed sandbox process');
	} else {
		reply('No process active');
	}
};
