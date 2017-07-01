'use strict';

const fs = require('fs');

const date = () => new Date().toLocaleString().split('.')[0].replace('T', ' ');

const rand = arr => arr[Math.floor(Math.random() * arr.length)];

const promisify = require('./modules/promisify');

const capitalizeFirstLetter = (str) =>
	str.charAt(0).toUpperCase() + str.slice(1);

const caps = (str) => {
	const strArr = str.toLowerCase().split('');
	for (let i = 0; i < strArr.length; i++)
		strArr[i] = 0.5 > Math.random() ? strArr[i] : strArr[i].toUpperCase();
	return strArr.join('');
};

const stat = promisify(fs.stat);
const deleteFile = promisify(fs.unlink);
const appendFile = promisify(fs.appendFile);
const size = file =>
	stat(file).then(stats => stats.size / 1024).catch(() => 0);

const exists = file => stat(file)
	.then(() => true)
	.catch(() => false);

module.exports = {
	appendFile,
	capitalizeFirstLetter,
	caps,
	date,
	deleteFile,
	exists,
	rand,
	size,
	stat
};