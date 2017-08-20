const { commandArgs } = require('../utils');

const caesarShift = (str, amounts) => {

	let amount;
	Number(amounts) < 0 ? amount = Number(amounts) + 26 : amount = Number(amounts);

	let output = '';
	
	for (let i = 0; i < str.length; i ++) {
		let c = str[i];
		if (c.match(/[a-z]/i)) {
			let code = str.charCodeAt(i);

			// Uppercase letters
			if ((code >= 65) && (code <= 90))
				c = String.fromCharCode(((code - 65 + amount) % 26) + 65);

			// Lowercase letters
			else if ((code >= 97) && (code <= 122))
				c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
		}
		output += c;
	}
	return output;
};

module.exports = ({ reply, message }) => {

	let boner = commandArgs(message);
	if(isNaN(boner[0]) || boner[0] < -26 || boner[0] > 26) return reply('First argument should be a shift (between -26 and 26) you retard, positive number for encoding, negative for decoding.');
	if(!boner[1]) return(reply('You forgot your message, retard.'));
	let amount = boner.shift();
	boner = boner.join(' ');
	return reply(caesarShift(boner, amount));

}