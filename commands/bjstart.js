'use strict';

// Placeholder for an actual BJ game

const bjstart = (name) => '👌 ' + name + ' is bust.\nThe dealer draws cards 10♥️, A♠️ (21)\n💰' + name + ' loses all money.';
module.exports = ({ reply, message }) => reply(bjstart(message.from.first_name));
