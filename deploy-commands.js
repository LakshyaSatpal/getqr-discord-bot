require("dotenv").config();
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [
  new SlashCommandBuilder()
    .setName("getqr")
    .setDescription("Get QR of any data")
    .addStringOption(option =>
      option
        .setName("data")
        .setDescription("This is input data")
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName("size")
        .setDescription("This is to define size of the output QR code")
    ),
].map(command => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_BOT_TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(err => console.log(err));
