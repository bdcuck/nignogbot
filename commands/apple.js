'use strict';

const apple = () => {
	let text = '';
	for (let i = 0; i < Math.floor(Math.random() * 20); i++)
		text += Math.random() < 0.5 ? '🍎' : '🍏';
	return text;
};
module.exports = apple;
