'use strict';

const fs = require('fs');

const promisify = fn => (...args) =>
	new Promise((resolve, reject) =>
		fn(...args, (err, ...results) => {
			if (err) return reject(err);
			return 1 === results.length
				? resolve(results[0])
				: resolve(results);
		}));

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
	date: () => new Date().toLocaleString().split('.')[0].replace('T', ' '),
	deleteFile,
	exists,
	rand: arr => arr[Math.floor(Math.random() * arr.length)],
	size,
	stat
};
