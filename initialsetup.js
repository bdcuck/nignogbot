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
	config = loadJSON('config.json');
} catch (err) {
	if (err.code !== 'ENOENT')
		throw err;
	config = loadJSON('example.config.json');
}

const stringValidator = async (object, name, def) => {
	while (object[name] === def) {
		console.log('Please paste your ' + name + ':');
		const value = (await line()).trim();
		if (value !== '')
			object[name] = value;
		else
			console.log('Invalid ' + name + ', try again!');
	}
};

(async (config) => {

	if (!fs.existsSync(config.logger.folder))
		fs.mkdirSync(config.logger.folder);

/*
consumer_key
consumer_secret
access_token_key
access_token_secret
*/
	await stringValidator(config.telegram, 'token',
		'<BOT TOKEN>');

	await stringValidator(config.twitter, 'consumer_key',
		'<TWITTER CONSUMER KEY>');

	await stringValidator(config.twitter, 'consumer_secret',
		'<TWITTER CONSUMER SECRET>');

	await stringValidator(config.twitter, 'access_token_key',
		'<TWITTER ACCESS TOKEN KEY>');

	await stringValidator(config.twitter, 'access_token_secret',
		'<TWITTER ACCESS TOKEN SECRET>');

	while (config.telegram.creator === 0) {
		console.log('Please pase your admin ID  (usually yourself):');
		const creator = Number((await line()).trim());
		if (
			!Number.isNaN(creator) &&
			creator < Number.MAX_SAFE_INTEGER &&
			creator > 0)
			config.telegram.creator = creator;
		else
			console.log('Invalid admin ID, try again!');
	}

	saveJSON('config.json', config);
	rl.close();
})(config);
