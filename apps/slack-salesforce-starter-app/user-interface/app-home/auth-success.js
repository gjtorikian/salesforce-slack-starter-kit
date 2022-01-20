'use strict';

const { HomeTab, Blocks } = require('slack-block-builder');

const authorization_success_screen = (username, event_ts) => {
    const homeTab = HomeTab({
        callbackId: 'authorization-salesforce-success',
        privateMetaData: 'authenticated'
    }).blocks(
        Blocks.Header({ text: 'Connected to Salesforce' }),
        Blocks.Divider(),
        Blocks.Section({
            text: `It's ${event_ts}, and you are successfully authenticated to Salesforce as ${username}.`
        })
    );
    return homeTab.buildToJSON();
};

module.exports = { authorization_success_screen };
