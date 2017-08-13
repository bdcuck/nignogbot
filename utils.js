'use strict';

const fs = require('fs');

const date = () => new Date().toLocaleString().split('.')[0].replace('T', ' ');

const rand = arr => arr[Math.floor(Math.random() * arr.length)];

const promisify = require('./modules/promisify');

const capitalizeFirstLetter = str =>
	str[0].toUpperCase() + str.slice(1);

const caps = str => {
	str = str.split('');
	for (let i = 0; i < str.length; i++)
		str[i] = Math.random() < 0.5
			? str[i].toLowerCase()
			: str[i].toUpperCase();
	return str.join('');
};

const stat = promisify(fs.stat);
const deleteFile = promisify(fs.unlink);
const appendFile = promisify(fs.appendFile);
const size = file =>
	stat(file).then(stats => stats.size / 1024).catch(() => 0);

const exists = file => stat(file)
	.then(() => true)
	.catch(() => false);

const commandArgs = msg => {
    let shitfuck = msg;
    shitfuck = shitfuck.text.split(/\s+/);
    shitfuck.shift();
    return shitfuck;
}

const commandText = msg => {
    let text = commandArgs(msg);
    text = text.join(' ');
    return text;
}

module.exports = {
	appendFile,
	capitalizeFirstLetter,
	caps,
    commandArgs,
    commandText,
	date,
	deleteFile,
	exists,
	rand,
	size,
	stat
};
