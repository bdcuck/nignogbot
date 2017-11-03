'use strict';

<<<<<<< HEAD
    const Telegraf = require('telegraf');

    const config = require('./config');

    const app = new Telegraf(config.telegram.token);

    app.startPolling();

=======
const Telegraf = require('telegraf');

const config = require('./config');

const app = new Telegraf(config.telegram.token);

app.startPolling();
>>>>>>> fd3befeabd911c8e10044f618d782c467d46d26f
