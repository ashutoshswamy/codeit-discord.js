const discord = require('discord.js');

module.exports = {
    data: new discord.SlashCommandBuilder()
    .setName("search")
    .setDescription("Search our coding database!")
    .addStringOption(option =>
            option.setName('query')
                .setDescription('Type to search for a technology...')
                .setAutocomplete(true)
                .setRequired(true)
        ),

    async autocomplete(interaction, client) {
        const focusedValue = interaction.options.getFocused();

        const choices = ['JavaScript', 'Python', 'TypeScript', 'HTML', 'Tailwind CSS', 'React', 'Node.js', 'MySQL'];

        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase()));

        await interaction.respond(
            filtered.slice(0, 25).map(choice => ({ name: choice, value: choice }))
        );
    },

    async execute(interaction, client) {
        const query = interaction.options.getString('query');
        await interaction.reply({ content: `You selected: **${query}**! 🚀` });
    },
}