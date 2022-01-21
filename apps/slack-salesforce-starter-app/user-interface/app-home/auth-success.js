'use strict';

const { HomeTab, Blocks } = require('slack-block-builder');

const authorization_success_screen = async (username, event_ts, conn) => {
    const result = await conn.query(`Select Name, Description FROM Contact`);
    let records = result.records;

    let fields = records.map((record) => {
        return `*${record.Name}*: ${record.Description}`;
    });

    const homeTab = await HomeTab({
        callbackId: 'authorization-salesforce-success',
        privateMetaData: 'authenticated'
    }).blocks(
        Blocks.Header({ text: 'Connected to Salesforce' }),
        Blocks.Divider(),
        Blocks.Section({
            text:
                'You are successfully authenticated to Salesforce with username ' +
                username
        })
    );
    return homeTab.buildToJSON();
};

module.exports = { authorization_success_screen };
