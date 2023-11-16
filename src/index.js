const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { clientReadyHandler } = require("./events/clientReady.js");
const { interactionHandler } = require("./events/interaction.js");
const { token } = require("./config.js");
// https://discord.js.org/docs/packages/discord.js/14.14.1/BaseClient:Class
// Client extends BaseClient which extends EventEmitter
// Bits are like permission flags
// Intents are named groups of pre-defined WebSocket events

// see  https://github.com/cyclic-software/starter-discord-bot#set-up-interactions-endpoint
// if we want to deploy using Cyclic, we need to use `discord-interactions` library instead

const pingCommand = require("./commands/ping");
const jokeCommand = require("./commands/getjoke.js");
const activityCommand = require("./commands/getActivity.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    // GatewayIntentBits.GuildMessages,
    // GatewayIntentBits.MessageContent,
    // GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();
client.commands.set(pingCommand.data.name, pingCommand);
client.commands.set(jokeCommand.data.name, jokeCommand);
client.commands.set(activityCommand.data.name, activityCommand);

client.once(Events.ClientReady, clientReadyHandler); // only be triggered once
client.on(Events.InteractionCreate, interactionHandler);

client.login(token);
