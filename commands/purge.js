const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'purge',
    description: 'Delete the last messages in all chats.',
    options: [
        {
            name: 'num',
            type: 4, // 'INTEGER' Type
            description: 'The number of messages you want to delete. (max 100)',
            required: true,
        },
    ],
    async execute(interaction) {
        // Check if the user has the Manage Messages permission
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({
                content: 'You need the **Manage Messages** permission to use this command!',
                ephemeral: true,
            });
        }

        // Check if the bot has the Manage Messages permission
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({
                content: 'I need the **Manage Messages** permission to delete messages!',
                ephemeral: true,
            });
        }

        const deleteCount = interaction.options.get('num').value;

        if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
            return interaction.reply({
                content: 'Please provide a number between 2 and 100 for the number of messages to delete',
                ephemeral: true,
            });
        }

        try {
            const fetched = await interaction.channel.messages.fetch({
                limit: deleteCount,
            });

            await interaction.channel.bulkDelete(fetched);
            await interaction.reply({
                content: `Successfully deleted ${deleteCount} messages`,
                ephemeral: true,
            });
        } catch (error) {
            await interaction.reply({
                content: `Couldn't delete messages because of: ${error.message}`,
                ephemeral: true,
            });
        }
    },
};