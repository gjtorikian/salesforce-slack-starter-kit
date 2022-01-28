'use strict';
const {
    editIndividualContact,
    authorize_sf_prompt
} = require('../../user-interface/modals');

const editContactButtonCallback = async ({ body, ack, client, context }) => {
    const contactId = body.actions[0].value;
    try {
        await ack();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    if (context.hasAuthorized) {
        const conn = context.sfconnection;
        const result = await conn.query(
            `Select Id, Name, Description FROM Contact WHERE Id='${contactId}'`
        );
        let record = result.records[0];
        await client.views.push({
            trigger_id: body.trigger_id,
            view: editIndividualContact(record)
        });
    } else {
        // Get BotInfo
        const botInfo = await client.bots.info({ bot: context.botId });
        // Open a Modal with message to navigate to App Home for authorization
        await client.views.push({
            trigger_id: body.trigger_id,
            view: authorize_sf_prompt(context.teamId, botInfo.bot.app_id)
        });
    }
};

module.exports = { editContactButtonCallback };
