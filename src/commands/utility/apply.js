const discord = require('discord.js');

module.exports = {
    data: new discord.SlashCommandBuilder()
    .setName("apply")
    .setDescription("Open the staff application form!"),

    async execute(interaction, client) {
        const modal = new discord.ModalBuilder()
        .setCustomId("staff_application")
        .setTitle("Staff Application Form");

        const nameInput = new discord.TextInputBuilder()
            .setCustomId("name_input")
            .setLabel("What is your name or nickname?")
            .setStyle(discord.TextInputStyle.Short)
            .setPlaceholder("e.g. John Doe")
            .setRequired(true);

        const reasonInput = new discord.TextInputBuilder()
            .setCustomId('app_reason')
            .setLabel('Why do you want to join our staff team?')
            .setStyle(discord.TextInputStyle.Paragraph)
            .setRequired(true)
            .setMinLength(10)
            .setMaxLength(500);

        const firstActionRow = new discord.ActionRowBuilder().addComponents(nameInput);
        const secondActionRow = new discord.ActionRowBuilder().addComponents(reasonInput);

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal);
    }
}