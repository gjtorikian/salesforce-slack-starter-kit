'use strict';
const {
    editContactResponse,
    authorize_sf_prompt
} = require('../../user-interface/modals');

const submitEditCallback = async ({ view, ack, client, context }) => {
    try {
        await ack();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    if (context.hasAuthorized) {
        const contactId = view.blocks[0].element.action_id;
        const newDescription =
            view.state.values['description-block'][contactId].value;

        const conn = context.sfconnection;
        await conn.sobject('Contact').update({
            Id: contactId,
            Description: newDescription
        });
        console.log(view);
        console.log(view.trigger_id);
        await client.views.open({
            trigger_id: view.trigger_id,
            view: await editContactResponse(conn)
        });
    } else {
        // Get BotInfo
        const botInfo = await client.bots.info({ bot: context.botId });
        // Open a Modal with message to navigate to App Home for authorization
        await client.views.push({
            trigger_id: view.trigger_id,
            view: authorize_sf_prompt(context.teamId, botInfo.bot.app_id)
        });
    }
};

module.exports = { submitEditCallback };
