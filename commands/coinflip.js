module.exports = {
    name: 'coinflip',
    description: 'Flip a coin.',
    async execute(interaction) {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        interaction.reply({ content: `🪙 You flipped: **${result}**`, ephemeral: false });
    },
};
