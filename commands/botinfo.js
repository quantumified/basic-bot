const { EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
    name: 'botinfo',
    description: 'Shows information about the bot (owner only).',
    async execute(interaction) {
        const allowedUsers = [process.env.OWNER_ID]; // comma-separated IDs in .env
        if (!allowedUsers.includes(interaction.user.id)) {
            return interaction.reply({ content: '❌ You do not have permission.', ephemeral: true });
        }

        const uptime = Math.floor(process.uptime());
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;

        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle('🤖 Bot Information')
            .addFields(
                { name: 'Ping', value: `${interaction.client.ws.ping}ms`, inline: true },
                { name: 'Servers', value: `${interaction.client.guilds.cache.size}`, inline: true },
                { name: 'Users', value: `${interaction.client.users.cache.size}`, inline: true },
                { name: 'Uptime', value: `${hours}h ${minutes}m ${seconds}s`, inline: true },
                { name: 'Platform', value: `${os.platform()} ${os.release()}`, inline: true },
                { name: 'Memory Usage', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true }
            )
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
