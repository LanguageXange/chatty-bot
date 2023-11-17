import { SlashCommandBuilder } from "discord.js";
import { fetchActivity } from "../requests/activity.js";

const data = new SlashCommandBuilder()
  .setName("activity")
  .setDescription("a random activity to do")
  .addStringOption((option) => {
    return option
      .setName("type")
      .setDescription("Choose a type of activity you are interested")
      .setRequired(true)
      .addChoices(
        { name: "Education", value: "education" },
        { name: "Recreational", value: "recreational" },
        { name: "Social", value: "social" },
        { name: "Diy", value: "diy" },
        { name: "Charity", value: "charity" },
        { name: "Cooking", value: "cooking" },
        { name: "Relaxation", value: "relaxation" },
        { name: "Music", value: "music" },
        { name: "Busywork", value: "busywork" }
      );
  });

async function execute(interaction) {
  const type = interaction.options.getString("type"); // this returns the option value
  const { activity } = await fetchActivity(type);
  await interaction.reply(`Activity Idea: ${activity}`);
}

export default { data, execute };
