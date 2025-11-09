const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a member (requires Kick Members permission).',
    options: [
        { name: 'user', type: 6, description: 'User to kick', required: true },
        { name: 'reason', type: 3, description: 'Reason for kick', required: false },
    ],
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({ content: '❌ You need Kick Members permission.', ephemeral: true });
        }

        const target = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!target) return interaction.reply({ content: '❌ User not found.', ephemeral: true });
        if (!target.kickable) return interaction.reply({ content: '❌ I cannot kick this user.', ephemeral: true });

        await target.kick(reason);
        interaction.reply({ content: `✅ Kicked ${target.user.tag}. Reason: ${reason}`, ephemeral: false });
    },
};
