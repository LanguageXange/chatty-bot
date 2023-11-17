import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import { clientReadyHandler } from "./events/clientReady.js";
import { interactionHandler } from "./events/interaction.js";
import setting from "./config.js";
import pingCommand from "./commands/ping.js";
import jokeCommand from "./commands/getjoke.js";
import activityCommand from "./commands/getActivity.js";
import songCommand from "./commands/getSong.js";
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

client.login(setting.token);
