import { SlashCommandBuilder } from "discord.js";

// https://discordjs.guide/creating-your-bot/slash-commands.html#individual-command-files
const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("reply with pong");

async function execute(interaction) {
  await interaction.reply(
    `Pong! This command was run by ${
      interaction.member?.nickname || interaction.user.globalName
    }`
  );
}

export default { data, execute };
