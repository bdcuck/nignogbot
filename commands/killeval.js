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

module.exports.help = 'Kill your eval sandbox if you screwed up or want to remove all stored variables';

