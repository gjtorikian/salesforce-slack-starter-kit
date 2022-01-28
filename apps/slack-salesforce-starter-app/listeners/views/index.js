'use strict';

const { submitEditCallback } = require('./submit-edit');

module.exports.register = (app) => {
    app.view('edit-individual', submitEditCallback);
};
