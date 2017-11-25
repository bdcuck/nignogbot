'use strict';

const { commandText } = require('../utils');
const { json } = require('req');
let shit;

module.exports = ({ reply, message }) => {
	let res = '';
	json('https://api.coinmarketcap.com/v1/ticker/?limit=0')
		.then(data => shit = data).then(() => {
			const tick = shit.find(x => x.symbol === commandText(message).toUpperCase());
			if (tick === undefined) return reply('Input a valid ticker symbol dumbass.');

			for (const key in tick)
				if (tick.hasOwnProperty(key))
					res += key + ': ' + tick[key] + '\n';
			res = res.replace(/_/g, ' ');
			reply(res);
		});
};

