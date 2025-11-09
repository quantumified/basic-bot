const { Collection } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');

module.exports = {
    name: 'reload',
    description: 'Reloads all bot commands.',
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
            await sendLogMessage(`**Command Attempt (Unauthorized)**\nUser: ${user.tag} (${user.id})\nCommand: /reload\nOutcome: Rejected (Missing permission)`);
            return interaction.reply({
                content: 'Only the bot owner can use this command!',
                ephemeral: true,
            });
        }

        try {
            // Defer reply to handle long-running operation
            await interaction.deferReply({ ephemeral: true });

            const commandsPath = path.join(__dirname, '.');
            const commandFiles = (await fs.readdir(commandsPath)).filter(file => file.endsWith('.js'));

            // Clear current commands
            client.commands = new Collection();

            // Reload commands
            for (const file of commandFiles) {
                // Clear require cache
                delete require.cache[require.resolve(path.join(commandsPath, file))];

                // Load command
                const command = require(path.join(commandsPath, file));
                if ('name' in command && 'execute' in command) {
                    client.commands.set(command.name, command);
                } else {
                    console.warn(`[WARNING] The command ${file} is missing required "name" or "execute" properties.`);
                }
            }

            // Log successful reload
            await sendLogMessage(`**Command Executed**\nUser: ${user.tag} (${user.id})\nCommand: /reload\nOutcome: Success (Reloaded ${client.commands.size} commands)`);

            await interaction.editReply({
                content: `Successfully reloaded ${client.commands.size} commands!`,
            });
        } catch (error) {
            // Log error
            await sendLogMessage(`**Command Failed**\nUser: ${user.tag} (${user.id})\nCommand: /reload\nOutcome: Failed\nError: ${error.message}`);
            console.error('[ERROR] Failed to reload commands:', error);
            await interaction.editReply({
                content: `Failed to reload commands: ${error.message}`,
                ephemeral: true,
            });
        }
    },
};