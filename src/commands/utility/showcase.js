const discord = require("discord.js")

module.exports = {
    data: new discord.SlashCommandBuilder()
    .setName("showcase")
    .setDescription("View our interactive carousel!"),

    async execute(interaction, client) {
        const imageCarousel = new discord.MediaGalleryBuilder()
        .addItems(
                new discord.MediaGalleryItemBuilder().setURL('https://picsum.photos/id/1015/600/400'),
                new discord.MediaGalleryItemBuilder().setURL('https://picsum.photos/id/1016/600/400'),
                new discord.MediaGalleryItemBuilder().setURL('https://picsum.photos/id/1018/600/400')
            );

        const localData = new discord.AttachmentBuilder("./src/example.json")
        .setName("example.json")

        const fileComponent = new discord.FileBuilder()
        .setURL("attachment://example.json")

        const layoutContainer = new discord.ContainerBuilder()
        .addMediaGalleryComponents(imageCarousel)
        .addFileComponents(fileComponent)

        await interaction.reply({
            components: [layoutContainer],
            files: [localData],
            flags: discord.MessageFlags.IsComponentsV2
        })
    }
}