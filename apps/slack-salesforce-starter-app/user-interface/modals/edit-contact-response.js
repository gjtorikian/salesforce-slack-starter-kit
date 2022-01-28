'use strict';
const {
    BlockCollection,
    Elements,
    Modal,
    Blocks
} = require('slack-block-builder');

const editContactResponse = async (conn) => {
    const result = await conn.query(`Select Name, Description FROM Contact`);
    let records = result.records;

    let blockCollection = records.map((record, idx) => {
        return Blocks.Section({
            text: `*${record.Name}*\n${record.Description}`
        }).accessory(Elements.Button().text(`Edit`).actionId(`edit_${idx}`));
    });

    console.log(
        Modal({ title: 'Salesforce Slack App', close: 'Close' })
            .blocks(blockCollection)
            .buildToJSON()
    );
    return Modal({ title: 'Salesforce Slack App', close: 'Close' })
        .blocks(blockCollection)
        .buildToJSON();
};

module.exports = { editContactResponse };
