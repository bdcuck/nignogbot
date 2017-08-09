'use strict';
const math = require('mathjs');
const calc = (input) => {
    let formula = input.text.split(/\s+/)
    formula = formula.splice(1, formula.length).join(' ');

    try {
        const result = math.eval(formula);
        return (String(result));
    } catch (err) {
        if (0 < err.message.length)
            return ('Error: ' + String(err.message));
    }
};
module.exports = ({
    reply,
    message
}) => reply(calc(message));