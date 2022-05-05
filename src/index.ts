import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from './utils/cowsay';

dotenv.config();

//How to get the bot to respond in channels
const CHANNELS = process.env.CHANNELS || null;

if (!CHANNELS) {
  console.error('CHANNELS is not defined');
  process.exit(1);
}

const channels = CHANNELS.split(',');
console.table(channels);

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (!channels.includes(message.channel.id)) return;
  const PREFIX = process.env.PREFIX || 'paz!';
  const check = message.content;
  const bool = check.startsWith(PREFIX);

  // Check if a message starts with PREFIX, if not, exit
  if (bool != true) {
    return;
  }

  //Parse the messages
  const args = message.content
    .toLowerCase()
    .substring(PREFIX.length)
    .slice()
    .trim()
    .split(/ /);
  const command = args.shift()!;
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
    //Check for the user giving a proper image name
    try {
      cowsay(param);
    } catch (error) {
      console.log(error);
      return;
    }
    message.react('🐄').then().catch(console.error);
    let output = cowsay(param);
    if (output.length > 1990) {
      message.react('😔').then().catch(console.error);
      /*  message
        .reply({
          content: 'exceeds the 2000 character limit',
        })
        .catch(console.error); */
      output = output.substring(0, 1990);
    }
    output = output.replace(/\`\`\`/g, "'''");
    message.reply(`\`\`\`${output}\`\`\``).catch(console.error);
  }
});

client.login(process.env.TOKEN);
