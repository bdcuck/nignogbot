'use strict';

const https = require('https');

const get = url =>
	new Promise((resolve, reject) =>
		https.get(url, res => {
			let data = '';
			res
				.on('error', reject)
				.on('data', d => data += d)
				.on('end', () => resolve(data));
		}).on('error', reject));

const compoundURL = 'https://pubchem.ncbi.nlm.nih.gov/compound/';
const imageURL = 'https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?t=l&cid=';

module.exports = compound => get(compoundURL + compound)
	.then(body =>
		body.match(/<meta name="pubchem_uid_value" content="(\d+)"/)[1])
	.then(result => imageURL + result);
