'use strict';

const vm = require('vm');

const globalVars = {
	console: console,
	setTimeout: setTimeout,
	clearTimeout: clearTimeout,
	crypto: require('crypto')
};

const context = vm.createContext(globalVars);

const evaluate = function evaluate (code) {
	try {
		process.stdout.write(String(vm.runInContext(code, context, {
			timeout: 20
		})));
	}
	catch (err) {
		process.stdout.write(err.stack.split('\n')[0]);
	}
};

let data = '';
process.stdin.on('data', d => {
	d = String(d);
	if(d.includes('\n') || d.includes('\r')){
		let dArr = d.split(/[\r\n]/);
		evaluate(data + dArr.shift());
		data = dArr.join('\n');
	}
});
