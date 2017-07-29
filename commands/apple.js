'use strict'

const apple = () => { 
    let text = '';
    for (let i = 0; i < Math.floor(Math.random() * 20); i++){
        text += 0.5 > Math.random() ? '🍎' : '🍏';
    }
    return text;
}
module.exports = apple;