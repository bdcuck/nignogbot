'use strict';

const { commandArgs } = require('../utils');
const DrugRPG = require('../modules/drugrpg.js');
const rpgRound = new DrugRPG();
let runningGames = {};

const rpg = (commandText) => 'feature currently under construction faggot';
module.exports = ({ message, reply }) => {
    const args = commandArgs(message);
    if ('function' === typeof rpgRound[args[0]]) {
        const [ action ] = args;
        const game = runningGames[message.from.id] ||
            (runningGames[message.from.id] = new DrugRPG());
        return reply(game[action](args[1]));
    } else {
        return reply(
            'Commands are: buy, make, sell, bribe, dealer and stats');
    }
}
