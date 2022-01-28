'use strict';
const { whoamiresponse } = require('./whoami-response');
const { editContactResponse } = require('./edit-contact-response');
const { editIndividualContact } = require('./edit-individual-contact');
const { authorize_sf_prompt } = require('./authorize-sf-prompt');

module.exports = {
    whoamiresponse,
    editContactResponse,
    editIndividualContact,
    authorize_sf_prompt
};
