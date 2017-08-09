'use strict';
const { nameFirst, nameLast } = require('../modules/jsons.js');
const rand = arr => arr[Math.floor(Math.random() * arr.length)];
const getRandomName = () => rand(nameFirst) + ' ' + rand(nameLast);
module.exports = ({ from, reply }) => reply(from.first_name + ' aka ' + getRandomName());
