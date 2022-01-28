'use strict';
const { Elements, Modal, Blocks } = require('slack-block-builder');

const editIndividualContact = (record) => {
    return Modal({ title: 'Edit Contact', close: 'Close' })
        .blocks(
            Blocks.Input({
                blockId: 'description-block',
                label: record.Name
            }).element(
                Elements.TextInput({
                    placeholder: record.Description,
                    actionId: record.Id
                })
            )
        )
        .submit('Save')
        .callbackId('edit-individual')
        .buildToJSON();
};

module.exports = { editIndividualContact };
