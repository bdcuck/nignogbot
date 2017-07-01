'use strict';

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

const loadJSON = path => JSON.parse(fs.readFileSync(path));
const saveJSON = (path, json) =>
	fs.writeFileSync(path, JSON.stringify(json, null, '\t'));
const line = () => new Promise(resolve => rl.once('line', resolve));

(async () => {

	let config;

	if (!fs.existsSync('chatlogs'))
		fs.mkdirSync('chatlogs');

	try {
		config = loadJSON('config.json');
	} catch (err) {
		if (err.code !== 'ENOENT')
			throw err;
		config = loadJSON('example.config.json');
	}

	while (config.telegram.token === '<BOT TOKEN>') {
		console.log('Please paste your bot token:');
		const token = (await line()).trim();
		if (token !== '')
			config.telegram.token = token;
		else
			console.log('Invalid token, try again!');
	}

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

	while (config.twitter.secret === '<TWITTER SECRET>') {
		console.log('Please paste your twitter API secret:');
		const secret = (await line()).trim();
		if (secret !== '')
			config.twitter.secret = secret;
		else
			console.log('Invalid secret, try again!');
	}

	saveJSON('config.json', config);
	rl.close();
})();
