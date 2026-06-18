require("dotenv").config();
const discord = require("discord.js");

const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.MessageContent
    ]
});

client.once("clientReady", () =>{
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", message =>{
    if (message.content === "!ping"){
        message.reply("Pong!");
    } else if(message.content === "!youtube"){
        message.reply("https://www.youtube.com/@codeitofficial3");
    }
})

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'serverinfo',
        description: 'Displays detailed information about this server.',
    }
];

const rest = new discord.REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async() =>{
    try{
        console.log("Started refreshing application (/) commands.");

        await rest.put(discord.Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

        console.log("Successfully reloaded application (/) commands.");
    } catch(error){
        console.error(error);
    }
})();

client.on("interactionCreate", async interaction =>{
    if (!interaction.isCommand()) return;

    if(interaction.commandName === "ping"){
        await interaction.reply({content: "Pong!", ephemeral: true});
    } else if(interaction.commandName === "serverinfo"){
        const infoEmbed = new discord.EmbedBuilder()
        .setColor("Blurple")
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTitle(`${interaction.guild.name} Information`)
        .setDescription(`Here is some information about ${interaction.guild.name}`)
        .addFields(
            { name: 'Total Members', value: `${interaction.guild.memberCount}`, inline: true },
            { name: 'Created On', value: `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:R>`, inline: true }
        )
        .setImage("https://i.imgur.com/gh44uQk.jpeg")
        .setFooter({text: "discord.js Series 2026"})
        .setTimestamp();

        await interaction.reply({ embeds: [infoEmbed] });
    }
})

client.login(process.env.BOT_TOKEN);