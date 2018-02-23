'use strict';

const { commandArgs } = require('../utils');
const fs = require('fs');
const commands = fs.readdirSync('commands')
  .map(x => ({
    file: './' + x,
    name: x.split('.').slice(0, -1).join('.')
  })).map(x => ({
    ...x,
    help: `*${x.name}* - _${(require(x.file).help || 'No description yet lmao')}_`
  }));

const helpText = commands.map(x => x.help).join('\n')

module.exports = ({ replyWithMarkdown }) => replyWithMarkdown(helpText);

module.exports.help = 'This message, dumbass';
