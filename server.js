require("dotenv").config();
// Require the necessary discord.js classes
const { Client, Intents, MessageAttachment } = require("discord.js");
const axios = require("axios");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  if (commandName === "getqr") {
    const inputData = interaction.options.getString("data");
    if (!inputData) {
      await interaction.reply("Bot needs some input to make QR code");
      return;
    }
    let inputSize = interaction.options.getInteger("size");
    if (!inputSize) {
      inputSize = 300;
    }
    if (inputSize > 545) {
      await interaction.reply("Size specified is too large");
      return;
    }
    await interaction.reply(
      `QR Code is Ready! https://chart.googleapis.com/chart?cht=qr&chs=${inputSize}x${inputSize}&chl=${inputData}`
    );
  } else {
    await interaction.reply("This bot has only one command 'getqr' ");
  }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_BOT_TOKEN);
