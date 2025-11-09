const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all available commands.',
    async execute(interaction) {
        const commands = interaction.client.commands;

        const allowedUsers = process.env.OWNER_ID.split(',');
        const isOwner = allowedUsers.includes(interaction.user.id);

        // Filter commands: hide owner-only commands if user is not owner
        const visibleCommands = commands.filter(cmd => {
            if (cmd.name === 'botinfo' && !isOwner) return false;
            return true;
        });

        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle('📜 Available Commands')
            .setDescription(
                visibleCommands.map(cmd => `**/${cmd.name}** — ${cmd.description}`).join('\n')
            )
            .setFooter({ text: 'Use /command to execute a command' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
