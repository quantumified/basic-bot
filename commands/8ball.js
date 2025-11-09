const answers = [
    'Yes.', 'No.', 'Maybe.', 'Definitely!', 'Absolutely not.', 'Ask again later.', 'It is certain.',
    'Very doubtful.', 'Without a doubt.', 'Most likely.'
];

module.exports = {
    name: '8ball',
    description: 'Ask the magic 8-ball a question.',
    options: [
        {
            name: 'question',
            type: 3, // STRING
            description: 'Your question',
            required: true,
        },
    ],
    async execute(interaction) {
        const response = answers[Math.floor(Math.random() * answers.length)];
        interaction.reply({ content: `🎱 Question: ${interaction.options.getString('question')}\nAnswer: **${response}**`, ephemeral: false });
    },
};
