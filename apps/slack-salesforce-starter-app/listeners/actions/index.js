'use strict';
const { appHomeAuthorizeButtonCallback } = require('./app-home-authorize-btn');
const { editContactButtonCallback } = require('./edit-contact-btn');

module.exports.register = (app) => {
    app.action('authorize-with-salesforce', appHomeAuthorizeButtonCallback);
    app.action('edit_contact', editContactButtonCallback);
};
