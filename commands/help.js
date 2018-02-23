'use strict';

const fs = require('fs');
const commands = fs.readdirSync('commands')
  .map(x => ({
    file: './' + x,
    name: x.split('.').slice(0, -1).join('.')
  })).map(x => ({
    ...x,
    help: x.name + ' - ' + (require(x.file).help || 'No description yet lmao')
  }));

const helpText = commands.map(x => x.help).join('\n')

module.exports = ({ reply }) => reply(helpText);
