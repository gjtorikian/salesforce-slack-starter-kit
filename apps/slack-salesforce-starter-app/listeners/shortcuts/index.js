'use strict';

const { whoamiCallback } = require('./whoami');
const { editContactCallback } = require('./edit-contact');

module.exports.register = (app) => {
    app.shortcut('who_am_i', whoamiCallback);
    app.shortcut('edit-contact-shortcut', editContactCallback);
};
