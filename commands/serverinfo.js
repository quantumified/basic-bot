const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Shows information about this server.',
    async execute(interaction) {
        const { guild } = interaction;
        const embed = new EmbedBuilder()
            .setTitle(`📊 ${guild.name} Info`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Server ID', value: guild.id, inline: true },
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Created At', value: `${guild.createdAt.toDateString()}`, inline: true },
                { name: 'Boosts', value: `${guild.premiumSubscriptionCount}`, inline: true }
            )
            .setColor('Blue')
            .setTimestamp();
        interaction.reply({ embeds: [embed], ephemeral: false });
    },
};
