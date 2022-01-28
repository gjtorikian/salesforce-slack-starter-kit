'use strict';

const { HomeTab, Blocks } = require('slack-block-builder');

const authorization_success_screen = async (username, event_ts, conn) => {
    const result = await conn.query(`Select Name, Description FROM Contact`);
    let records = result.records;

    let fields = records.map((record) => {
        return `*${record.Name}*: ${record.Description}`;
    });

    const homeTab = HomeTab({
        callbackId: 'authorization-salesforce-success',
        privateMetaData: 'authenticated'
    }).blocks(
        Blocks.Header({ text: 'Connected to Salesforce' }),
        Blocks.Divider(),
        Blocks.Section({
            text: `It's ${event_ts}, and you are successfully authenticated to Salesforce as ${username}.`
        }),
        Blocks.Divider(),
        Blocks.Header({ text: 'Contacts' }),
        Blocks.Section({
            text: fields.join('\n')
        })
    );

    return homeTab.buildToJSON();
};

module.exports = { authorization_success_screen };
