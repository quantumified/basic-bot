module.exports = {
    name: 'dice',
    description: 'Roll a dice with a specified number of sides.',
    options: [
        {
            name: 'sides',
            type: 4, // INTEGER
            description: 'Number of sides on the dice',
            required: false,
        },
    ],
    async execute(interaction) {
        const sides = interaction.options.getInteger('sides') || 6;
        if (sides < 2) return interaction.reply({ content: '❌ Dice must have at least 2 sides.', ephemeral: true });

        const roll = Math.floor(Math.random() * sides) + 1;
        interaction.reply({ content: `🎲 You rolled a ${roll} on a ${sides}-sided dice!`, ephemeral: false });
    },
};
