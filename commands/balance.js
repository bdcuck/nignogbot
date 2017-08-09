'use strict';

const jsdom = require('jsdom/lib/old-api.js');

const balance = (commandText) => {
	jsdom.env('http://www.webqc.org/balance.php?reaction=' +
				encodeURIComponent(commandText), (err, win) => {
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
                    return text;
				});
    
};
module.exports = ({ reply }) => reply(balance());
