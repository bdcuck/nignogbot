'use strict';

const vm = require('vm');

const globalVars = {
	clearTimeout,
	console,
	crypto: require('crypto'),
	setTimeout
};

const context = vm.createContext(globalVars);

function evaluate(code) {
	try {
		process.stdout.write(String(vm.runInContext(code, context, {
			timeout: 20
		})));
	} catch (err) {
		process.stdout.write(err.stack.split('\n')[0]);
	}
}

let data = '';
process.stdin.on('data', d => {
	d = String(d);
	if (d.includes('\n') || d.includes('\r')) {
		const dArr = d.split(/[\r\n]/);
		evaluate(data + dArr.shift());
		data = dArr.join('\n');
	}
});
