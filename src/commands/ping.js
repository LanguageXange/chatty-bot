const { SlashCommandBuilder } = require("discord.js");
const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("reply with pong");

async function execute(interaction) {
  await interaction.reply("Pong!");
}
module.exports = { data, execute };
