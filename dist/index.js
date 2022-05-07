"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = tslib_1.__importStar(require("discord.js"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const CHANNELS = process.env.CHANNELS || null;
if (!CHANNELS) {
    console.error('CHANNELS is not defined');
    process.exit(1);
}
const channels = CHANNELS.split(',');
console.table(channels);
const client = new discord_js_1.default.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
client.on('ready', () => {
    console.log('The bot is ready');
    let handler = require('./command-handler');
    if (handler.default)
        handler = handler.default;
    handler(client);
});
client.login(process.env.TOKEN);
