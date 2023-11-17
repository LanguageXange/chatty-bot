import "dotenv/config";
const setting = {
  token: process.env.BOT_TOKEN,
  clientId: process.env.APP_ID,
  guildId: process.env.GUILD_ID,
  rapidApiKey: process.env.API_KEY,
};

export default setting;
