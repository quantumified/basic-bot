module.exports = {
    name: 'remindme',
    description: 'Set a reminder. Example: /remindme 10m Take a break',
    options: [
        {
            name: 'time',
            type: 3, // STRING
            description: 'Time until reminder (e.g., 10s, 5m, 1h)',
            required: true,
        },
        {
            name: 'message',
            type: 3, // STRING
            description: 'Message to remind you of',
            required: true,
        },
    ],
    async execute(interaction) {
        const timeInput = interaction.options.getString('time');
        const message = interaction.options.getString('message');

        const timeMatch = timeInput.match(/^(\d+)(s|m|h)$/);
        if (!timeMatch) {
            return interaction.reply({ content: '❌ Invalid time format! Use s, m, or h (e.g., 10m).', ephemeral: true });
        }

        let duration = parseInt(timeMatch[1]);
        const unit = timeMatch[2];
        if (unit === 'm') duration *= 60;
        if (unit === 'h') duration *= 3600;

        await interaction.reply({ content: `⏰ I will remind you in ${timeInput}`, ephemeral: true });

        setTimeout(async () => {
            try {
                await interaction.user.send(`🔔 Reminder: ${message}`);
            } catch (err) {
                // If unable to DM, fallback to channel
                interaction.channel.send(`${interaction.user}, 🔔 Reminder: ${message}\n*(I was unable to DM you directly.)*`);
            }
        }, duration * 1000);
    },
};
