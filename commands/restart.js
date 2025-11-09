module.exports = {
    name: 'restart',
    description: 'Restarts the bot.',
    async execute(interaction) {
        const logChannelId = '1360172133615009833';
        const client = interaction.client;
        const user = interaction.user;
        const logChannel = await client.channels.fetch(logChannelId).catch(() => null);

        // Function to send log message
        async function sendLogMessage(content) {
            if (logChannel?.isTextBased()) {
                try {
                    await logChannel.send(content);
                } catch (error) {
                    console.error(`[ERROR] Failed to send log to channel ${logChannelId}:`, error);
                }
            } else {
                console.warn(`[WARNING] Channel ${logChannelId} is not text-based or not found.`);
            }
        }

        // Check if the user has the specific ID
        if (user.id !== '844893406395498506') {
            await sendLogMessage(`**Command Attempt (Unauthorized)**\nUser: ${user.tag} (${user.id})\nCommand: /restart\nOutcome: Rejected (Missing permission)`);
            return interaction.reply({
                content: 'Only the bot owner can use this command!',
                ephemeral: true,
            });
        }

        try {
            // Send confirmation and log before restarting
            await Promise.all([
                interaction.reply({
                    content: 'Restarting the bot...',
                    ephemeral: true,
                }),
                sendLogMessage(`**Command Executed**\nUser: ${user.tag} (${user.id})\nCommand: /restart\nOutcome: Initiated restart`),
            ]);

            // Log to console
            console.log(`${user.tag} initiated a bot restart.`);

            // Exit process (PM2 or similar should restart)
            process.exit(0);
        } catch (error) {
            // Log error
            await sendLogMessage(`**Command Failed**\nUser: ${user.tag} (${user.id})\nCommand: /restart\nOutcome: Failed\nError: ${error.message}`);
            await interaction.reply({
                content: `Failed to restart the bot: ${error.message}`,
                ephemeral: true,
            });
        }
    },
};