'use strict';

const shortcutsListener = require('./shortcuts');
const eventsListener = require('./events');
const actionListener = require('./actions');
const viewListener = require('./views');

module.exports.registerListeners = (app) => {
    shortcutsListener.register(app);
    eventsListener.register(app);
    actionListener.register(app);
    viewListener.register(app);
};
