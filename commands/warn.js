const { PermissionsBitField } = require('discord.js');

const warnings = new Map(); // In-memory; resets on bot restart

module.exports = {
    name: 'warn',
    description: 'Warn a member (requires Manage Messages permission).',
    options: [
        { name: 'user', type: 6, description: 'User to warn', required: true },
        { name: 'reason', type: 3, description: 'Reason for warning', required: false },
    ],
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({ content: '❌ You need Manage Messages permission.', ephemeral: true });
        }

        const target = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!warnings.has(target.id)) warnings.set(target.id, []);
        warnings.get(target.id).push(reason);

        interaction.reply({ content: `⚠️ Warned ${target.tag}. Total warnings: ${warnings.get(target.id).length}`, ephemeral: false });
    },
};
