const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { fetchSongs } = require("../requests/song");

const data = new SlashCommandBuilder()
  .setName("songs")
  .setDescription("recommend 10 songs to me!")
  .addStringOption((option) =>
    option
      .setName("period")
      .setDescription("Choose the time period")
      .setRequired(true)
      .addChoices(
        { name: "All Time Favorite", value: "all_time" },
        { name: "What's Popular This Month", value: "month" },
        { name: "What's Popular This Week", value: "week" },
        { name: "What's Popular Today", value: "day" }
      )
  )
  .addStringOption((option) => {
    return option
      .setName("genre")
      .setDescription("Choose the genre of music you are interested in")
      .setRequired(true)
      .addChoices(
        { name: "All", value: "all" },
        { name: "Rap", value: "rap" },
        { name: "Pop", value: "pop" },
        { name: "R&B", value: "rb" },
        { name: "Rock", value: "rock" },
        { name: "Country", value: "country" }
      );
  });

async function execute(interaction) {
  const period = interaction.options.getString("period"); // this returns the option value
  const genre = interaction.options.getString("genre"); // this returns the option value

  try {
    const songArr = await fetchSongs(period, genre);

    const embed = new EmbedBuilder()
      .setColor(0x3f70d4)
      .setTitle(`Here are the songs ... `)
      .setTimestamp()
      .setFooter({
        text: "powered by genius-song-lyrics1.p.rapidapi.com",
      });
    for (let i = 0; i < songArr.length; i++) {
      const { artist, title, url } = songArr[i];
      const fieldName = `Song: ${title}\nBy: ${artist}`;
      const fieldValue = `Check out the link: ${url}`;
      embed.addFields({ name: fieldName, value: fieldValue, inline: false });
    }

    await interaction.reply({ embeds: [embed] });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { data, execute };
