'use strict';

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

const loadJSON = path => JSON.parse(fs.readFileSync(path));
const saveJSON = (path, json) =>
	fs.writeFileSync(path, JSON.stringify(json, null, '\t'));
const line = () => new Promise(resolve => rl.once('line', resolve));

let config;

try {
	process.argv[2] === '--config'
		? config = loadJSON('example.config.json')
		: config = loadJSON('config.json');
} catch (err) {
	if (err.code !== 'ENOENT')
		throw err;
	config = loadJSON('example.config.json');
}

const validate = async (object, name, def,
	preprocessor = x => x,
	validator = val => val !== ''
) => {
	while (object[name] === def) {
		console.log('Please paste your ' + name + ':');
		/* eslint no-await-in-loop: off */
		const value = preprocessor((await line()).trim());
		if (validator(value))
			object[name] = value;
		else
			console.log('Invalid ' + name + ', try again!');
	}
};

(async (conf) => {

	if (!fs.existsSync(conf.logger.folder))
		fs.mkdirSync(conf.logger.folder);

	await validate(conf.telegram, 'token',
		'<BOT TOKEN>');

	await validate(conf.telegram, 'creator', 0,
		x => Number(x),
		x => !Number.isNaN(x) && x < Number.MAX_SAFE_INTEGER && x > 0);

	await validate(conf.twitter, 'consumer_key',
		'<TWITTER CONSUMER KEY>');

	await validate(conf.twitter, 'consumer_secret',
		'<TWITTER CONSUMER SECRET>');

	await validate(conf.twitter, 'access_token_key',
		'<TWITTER ACCESS TOKEN KEY>');

	await validate(conf.twitter, 'access_token_secret',
		'<TWITTER ACCESS TOKEN SECRET>');

	saveJSON('config.json', conf);
	rl.close();

	console.log('config.json OK');
})(config);

