'use strict';
const { whoamiresponse } = require('./whoami-response');
const { editContactResponse } = require('./edit-contact-response');
const { authorize_sf_prompt } = require('./authorize-sf-prompt');

module.exports = { whoamiresponse, editContactResponse, authorize_sf_prompt };
