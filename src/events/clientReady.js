const { REST, Routes } = require("discord.js");
const { token, clientId, guildId } = require("../config.js");
const rest = new REST().setToken(token);
async function clientReadyHandler(client) {
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

module.exports = { clientReadyHandler };
