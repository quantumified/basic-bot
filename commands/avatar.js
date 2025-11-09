module.exports = {
    name: 'avatar',
    description: 'Get the avatar of a user or the server icon.',
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to get the avatar of',
            required: false,
        },
        {
            name: 'server',
            type: 5, // BOOLEAN
            description: 'Show server icon instead',
            required: false,
        },
    ],
    async execute(interaction) {
        const showServer = interaction.options.getBoolean('server');
        if (showServer) {
            const iconURL = interaction.guild.iconURL({ dynamic: true, size: 1024 });
            return interaction.reply({ content: `Server Icon: ${iconURL}`, ephemeral: false });
        }

        const target = interaction.options.getUser('user') || interaction.user;
        interaction.reply({
            content: `${target.tag}'s avatar: ${target.displayAvatarURL({ dynamic: true, size: 1024 })}`,
            ephemeral: false,
        });
    },
};
