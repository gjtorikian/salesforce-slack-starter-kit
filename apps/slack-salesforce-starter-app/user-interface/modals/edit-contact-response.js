'use strict';
const { Elements, Modal, Blocks } = require('slack-block-builder');

const editContactResponse = async (conn) => {
    const result = await conn.query(
        `Select Id, Name, Description FROM Contact`
    );
    let records = result.records;

    let blockCollection = records.map((record) => {
        return Blocks.Section({
            text: `*${record.Name}*\n${record.Description}`
        }).accessory(
            Elements.Button()
                .text(`Edit`)
                .actionId(`edit_contact`)
                .value(record.Id)
        );
    });

    return Modal({ title: 'Salesforce Slack App', close: 'Close' })
        .blocks(blockCollection)
        .buildToJSON();
};

module.exports = { editContactResponse };
