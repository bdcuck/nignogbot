'use strict'

const { json } = require('req');

const rand = max => (num => num === 404
	? rand(max)
	: num)(Math.floor((Math.random() * max) + 1));

module.exports = ({ replyWithPhoto }) =>
	json('https://xkcd.com/info.0.json')
		.then(data =>
			json(`https://xkcd.com/${rand(data.num)}/info.0.json`))
		.then(data =>
			replyWithPhoto(data.img, { caption: data.title }));
