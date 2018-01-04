'use strict';

const { commandText } = require('../utils');
const config = require('../config.json');
const TwitterPackage = require('twitter');
const Twitter = new TwitterPackage(config.twitter);

module.exports = ({ reply, message }) => {
	if (commandText(message)) {
		const tweet = (commandText(message) + ' - ' + message.from.first_name).replace('@', '@ ');
		if (280 >= tweet.length)
			Twitter.post('statuses/update', {
				status: tweet
			}, (err) => {
				if (err)
					return reply(err);
				reply(
					'Messaged tweeted https://twitter.com/rambodildo');
			});
		else
			reply(`
		Too long, you boner! 
		(${tweet.length - 280} characters)`);
	} else {
		reply('You forgot your message retard');
	}
};
