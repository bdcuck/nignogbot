'use strict';

const kekget = () => {
    for (let i = 0; i < Math.floor(Math.random() * 20); i++)
        text += 0.5 > Math.random() ? 'K' : 'E';
    if ('KEK' === text)
        return ('\nYOU WIN TOPKEK!!!');
    else if ('KKK' === text)
        return (text + '\nYOU WIN TOPKKK HEIL HITLER!!!');
    else if ('KEKKEK' === text)
        return (text + '\nYOU WIN DOUBLE TOPKEKKEK!!!');
    else if ('KEKKEKKEK' === text)
        return (text + '\nYOU WIN ULTIMATE TRIPLE TOPKEKKEKKEK!!!');
    else if ('KEKKEKKEKKEK' === text)
        return (text + '\nQUADDRUPPLE TOPKEKKEKKEKKEK!!! YOU ARE GAY!!!');
    else if ('KEKKEKKEKKEKKEK' === text)
        return (text + '\nQUINTUPLE TOPKEKKEKKEKKEKKEK!!! UNBELIEVABLE M8!!!');
    else
        return (
            '\nLength: \n' + text.length);
}
module.exports = ({ reply }) => reply(kekget());
