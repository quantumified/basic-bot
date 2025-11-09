module.exports = {
    name: 'roles',
    description: 'Lists the roles of a user.',
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to get roles of',
            required: false,
        },
    ],
    async execute(interaction) {
        const target = interaction.options.getUser('user') || interaction.user;
        const member = interaction.guild.members.cache.get(target.id);
        if (!member) return interaction.reply({ content: '❌ User not found.', ephemeral: true });

        const roles = member.roles.cache
            .filter(r => r.id !== interaction.guild.id)
            .map(r => r.toString())
            .join(', ') || 'No roles';

        interaction.reply({ content: `Roles for **${target.tag}**: ${roles}`, ephemeral: false });
    },
};
