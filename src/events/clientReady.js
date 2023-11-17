import { REST, Routes } from "discord.js";

import setting from "../config.js";
const { token, clientId, guildId } = setting;
const rest = new REST().setToken(token);
export async function clientReadyHandler(client) {
  console.log(`Logged in as ${client.user.username}`);

  try {
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      {
        body: client.commands.map((command) => {
          return command.data.toJSON();
        }),
      }
    );
    console.log(`Loaded ${data.length} commands`);
  } catch (err) {
    console.log("Error", err);
  }
}
