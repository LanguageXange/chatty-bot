const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { clientReadyHandler } = require("./events/clientReady.js");
const { interactionHandler } = require("./events/interaction.js");
const { token } = require("./config.js");

const pingCommand = require("./commands/ping");
const jokeCommand = require("./commands/getjoke.js");
const activityCommand = require("./commands/getActivity.js");
const songCommand = require("./commands/getSong.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();
client.commands.set(pingCommand.data.name, pingCommand);
client.commands.set(jokeCommand.data.name, jokeCommand);
client.commands.set(activityCommand.data.name, activityCommand);
client.commands.set(songCommand.data.name, songCommand);

client.once(Events.ClientReady, clientReadyHandler); // only be triggered once
client.on(Events.InteractionCreate, interactionHandler);

client.login(token);
