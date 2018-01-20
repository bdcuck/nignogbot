'use strict';

const { commandArgs } = require('../utils');
const DrugRPG = require('../modules/drugrpg.js');
const rpg = new DrugRPG();
let runningGames = {};

module.exports = ({ message, reply }) => {
    const args = commandArgs(message);
    if ('function' === typeof rpg[args[0]]) {
        const [ action ] = args;
        const game = runningGames[message.from.id] ||
            (runningGames[message.from.id] = new DrugRPG());
        return reply(game[action](args[1]));
    } else {
        return reply(
            'Commands are: buy, make, sell, bribe, dealer and stats');
    }
}
