'use strict';

const { commandArgs, commandText, id } = require('../utils');
const { vm } = require('../modules/vmState.js');

module.exports = ({ reply, message }) => {
	let context;
	if (vm.exists(id(message))) {
		context = vm.get(id(message));
		context.stdout.removeAllListeners('data');
		context.stdout.unpipe();
	} else {
		context = vm.create(id(message));
	}
	context.stdout.on('data', data => {
		reply(String(data));
	});
	context.run(commandText(message));
};

module.exports.help = 'Evaluate JavaScript';
