'use strict';

const config = require('../../config.json');

const bot = {
	queue: [],
	get: fn => bot.queue.push(fn),
	register: instance => {
		while (bot.queue.length > 0)
			bot.queue.shift()(instance);
		bot.get = fn => fn(instance);
		return log;
	}
};

const log = msg => bot.get(bot =>
	bot.telegram.sendMessage(config.logger.chat, msg));

log.register = bot.register;

module.exports = log;

