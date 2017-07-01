'use strict';

const promisify = fn => (...args) =>
	new Promise((resolve, reject) =>
		fn(...args, (err, ...results) => {
			if (err) return reject(err);
			return 1 === results.length
				? resolve(results[0])
				: resolve(results);
		}));

module.exports = promisify;
