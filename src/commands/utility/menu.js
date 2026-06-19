const discord = require("discord.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
    .setName("color")
    .setDescription("Pick your favourite color!"),

    async execute(interaction, client) {
        const redOption = new discord.StringSelectMenuOptionBuilder()
        .setLabel("Red")
        .setDescription("Select the red color theme")
        .setValue("color_red")
        .setEmoji("🔴");

        const blueOption = new discord.StringSelectMenuOptionBuilder()
        .setLabel("Blue")
        .setDescription("Select the blue color theme")
        .setValue("color_blue")
        .setEmoji("🔵");

        const yellowOption = new discord.StringSelectMenuOptionBuilder()
        .setLabel("Yellow")
        .setDescription("Select the yellow color theme")
        .setValue("color_yellow")
        .setEmoji("🟡");


        const selectMenu = new discord.StringSelectMenuBuilder()
        .setCustomId("color_select")
        .setPlaceholder("Choose a color...")
        .addOptions(redOption, blueOption, yellowOption)

        const row = new discord.ActionRowBuilder()
        .addComponents(selectMenu);

        const response = await interaction.reply({
            content: "Please select your favorite color from the menu below:",
            components: [row],
            fetchReply: true
        })

        const collector = response.createMessageComponentCollector({ time: 30000 });

        collector.on("collect", async(i) => {
            if (i.user.id !== interaction.user.id) {
                return i.reply({ content: 'This selection menu isn\'t for you!', ephemeral: true });
            }

            const selectedColor = i.values[0];

            if (selectedColor === "color_red") {
                await i.update({ content: 'You selected **Red**! 🔴 Your profile layout has been updated.', components: [] });
            } else if( selectedColor === "color_blue") {
                await i.update({ content: 'You selected **Blue**! 🔵 Your profile layout has been updated.', components: [] });
            } else if( selectedColor === "color_yellow") {
                await i.update({ content: 'You selected **Yellow**! 🟡 Your profile layout has been updated.', components: [] });
            }
        });

        collector.on("end", async() =>{
            const disabledRow = new discord.ActionRowBuilder()
            .addComponents(
                discord.StringSelectMenuBuilder.from(selectMenu).setDisabled(true)
            );
        
            await interaction.editReply({ components: [disabledRow] });
        })
    }
}