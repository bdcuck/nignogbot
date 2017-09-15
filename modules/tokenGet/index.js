'use strict';

const { json } = require('req');

const regex = /\d{9}:.{35}/g;

const checker = ({ message, reply }) =>
	Promise.all(message.text.match(regex).map(token =>
		json('https://api.telegram.org/bot' + token + '/getMe')))
		.then(results => results
			.filter(bot => bot.ok)
			.map(bot =>
				'Valid token detected!' +
				'\nid: ' + bot.result.id +
				'\nfirst_name: ' + bot.result.first_name +
				'\nusername :' + bot.result.username)
			.map(reply));

module.exports = [
	regex,
	checker
];
