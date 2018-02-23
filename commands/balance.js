'use strict';

const jsdom = require('jsdom/lib/old-api.js');

module.exports = ({ reply, message }) => {
	let formula = message.text.split(/\s+/);
	formula = formula.splice(1, formula.length).join(' ');
	jsdom.env('http://www.webqc.org/balance.php?reaction=' +
								encodeURIComponent(formula), (err, win) => {
		if (err) return;
		let text = '';
		const equation = win.document
			.querySelector('td.center > b')
			.textContent;
		const reaction = win.document
			.querySelector('td.center > br')
			.nextSibling
			.textContent;
		text = equation + '\n' + reaction;
		console.log(text);
		return reply(text);
	});

};

module.exports.help = 'Used to work but I think I broke it recently by removing case sensitivity';
