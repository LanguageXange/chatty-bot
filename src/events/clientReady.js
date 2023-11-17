import { REST, Routes } from "discord.js";
// https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands

import setting from "../config.js";

const { token, clientId, guildId } = setting;
const rest = new REST({ version: "10" }).setToken(token);
export async function clientReadyHandler(client) {
  console.log(`Hi ${client.user.username}! You're logged in and ready`);

  try {
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      {
        body: client.commands.map((command) => {
          return command.data.toJSON();
        }),
      }
    );
    console.log(`Loading ${data.length} commands`);
  } catch (err) {
    console.log("Error", err);
  }
}
