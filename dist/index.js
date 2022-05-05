"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = tslib_1.__importStar(require("discord.js"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const cowsay_1 = tslib_1.__importDefault(require("./utils/cowsay"));
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
});
client.on('messageCreate', (message) => {
    if (!channels.includes(message.channel.id))
        return;
    const PREFIX = process.env.PREFIX || 'paz!';
    const check = message.content;
    const bool = check.startsWith(PREFIX);
    if (bool != true) {
        return;
    }
    const args = message.content
        .toLowerCase()
        .substring(PREFIX.length)
        .slice()
        .trim()
        .split(/ /);
    const command = args.shift();
    const param = args.pop();
    console.log(message.content);
    console.log(param);
    console.log(typeof param);
    console.log(command);
    if (command === 'ping') {
        message
            .react('😄')
            .then(() => {
            console.log('ping reaction');
        })
            .catch(console.error);
        message
            .reply({
            content: 'pong',
        })
            .catch(console.error);
    }
    if (command === 'cowsay') {
        try {
            (0, cowsay_1.default)(param);
        }
        catch (error) {
            console.log(error);
            return;
        }
        message.react('🐄').then().catch(console.error);
        let output = (0, cowsay_1.default)(param);
        if (output.length > 1990) {
            message.react('😔').then().catch(console.error);
            output = output.substring(0, 1990);
        }
        output = output.replace(/\`\`\`/g, "'''");
        message.reply(`\`\`\`${output}\`\`\``).catch(console.error);
    }
});
client.login(process.env.TOKEN);
