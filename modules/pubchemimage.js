'use strict';

const { JSDOM } = require('jsdom');

const compoundURL = 'https://pubchem.ncbi.nlm.nih.gov/compound/';
const imageURL = 'https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?t=l&cid=';

module.exports = compound => new Promise((resolve, reject) => {
	JSDOM.fromURL(compoundURL + compound)
		.then(dom => {
			const metaElem = dom.window.document.body
				.querySelector('meta[name="pubchem_uid_value"]');
			if (metaElem) {
				const cid = metaElem.getAttribute('content');
				if (cid) {
					resolve(imageURL + cid);
				} else {
					reject(Error('CID not found'));
				}
			} else {
				reject(Error('Element not found'));
			}
		});
});
