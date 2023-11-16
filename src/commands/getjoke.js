const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { fetchJokes } = require("../requests/joke");

const data = new SlashCommandBuilder()
  .setName("joke")
  .setDescription("give me a random joke");
async function execute(interaction) {
  await interaction.deferReply();
  try {
    const { setup, punchline, type } = await fetchJokes();
    const embed = new EmbedBuilder()
      .setColor(0x3f70d4)
      .setTitle(`Here is a ${type} joke ... `)
      .addFields(
        { name: "Set up:", value: `${setup} 🤔` },
        {
          name: "\u200b",
          value: "\u200b",
          inline: false,
        },
        { name: "Punchline:", value: `${punchline}  😆 ` }
      )
      .setTimestamp()
      .setFooter({
        text: "powered by official-joke-api.appspot.com",
      });

    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    await interaction.editReply(err);
  }
}

module.exports = { data, execute };
