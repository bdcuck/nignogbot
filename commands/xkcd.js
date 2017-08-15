'use strict'

const { json } = require('req');
const randComic = max => {
	let num;
	do {
	  num = Math.floor((Math.random() * max) + 1);
	} while (num == 404);
	return num;
  }

module.exports = ({ replyWithPhoto }) => {
	let counter = 1;
	json('https://xkcd.com/info.0.json')
	.then(data => counter = data.num)
	.then(() => {
		counter = randComic(counter);
		json(`https://xkcd.com/${counter}/info.0.json`)
		.then(res => {
			replyWithPhoto(res.img, { caption: res.title });
		})

	})

}
