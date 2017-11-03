'use strict';

    const Telegraf = require('telegraf');

    const config = require('./config');

    const app = new Telegraf(config.telegram.token);

    app.startPolling();

