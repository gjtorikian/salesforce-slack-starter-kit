'use strict';

const {
    editContactResponse,
    authorize_sf_prompt
} = require('../../user-interface/modals');

const editContactCallback = async ({ shortcut, ack, client, context }) => {
    try {
        await ack();
        if (context.hasAuthorized) {
            const conn = context.sfconnection;
            await client.views.open({
                trigger_id: shortcut.trigger_id,
                view: await editContactResponse(conn)
            });
        } else {
            // Get BotInfo
            const botInfo = await client.bots.info({ bot: context.botId });
            // Open a Modal with message to navigate to App Home for authorization
            await client.views.open({
                trigger_id: shortcut.trigger_id,
                view: authorize_sf_prompt(context.teamId, botInfo.bot.app_id)
            });
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

module.exports = { editContactCallback };
