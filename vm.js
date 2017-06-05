const cp = require('child_process');

const VM = function VM () {
	if(!(this instanceof VM)) return new (VM.bind.apply(VM, [this].concat(Array.from(arguments))));

	const self = this;

	const contexts = {};

	this.get = function GetChild (id) {
		if(self.exists(id)){
			id = Number(id);

			const child = { stdout: contexts[id].stdout };

			child.run = function RunCode (code) {
				return self.run(id, code);
			};
			return child;
		}
		return null;
	};

	this.create = function CreateVM (id, stream) {
		id = Number(id);
		contexts[id] = cp.spawn('node', ['sandbox.js']);
		if(typeof stream !== 'undefined') contexts[id].pipe(stream);
		contexts[id].on('exit', () => delete contexts[id]);
		return self.get(id);
	};

	this.run = function RunCode (id, code) {
		id = Number(id);
		code = String(code);
		if(self.exists(id)){
			contexts[id].stdin.write(code + '\n');
		}
	};

	this.destroy = function DestroyVM (id) {
		contexts[id].kill();
		delete contexts[id];
	};

	this.destroyAll = function DestroyAllVMs () {
		for(k in contexts)
			self.destroy(k);
	}

	this.exists = function VMExists (id) {
		return typeof contexts[id] !== 'undefined';
	};
};

module.exports = VM;
