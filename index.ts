import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from './utils/cowsay';

//const output = cowsay();
//console.log(output);

dotenv.config();

//const PREFIX = process.env.PREFIX;
//console.log(PREFIX);

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  const PREFIX = process.env.PREFIX || 'paz!';
  // console.log(PREFIX);
  // console.log(PREFIX.length);
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
  const command = args.shift()!;
  const param = args.pop();

  console.log(message.content);
  console.log(param);
  console.log(typeof param);
  console.log(command);

  if (command === 'ping') {
    message.react('😄').then(console.log).catch(console.error);
    message
      .reply({
        content: 'pong',
      })
      .catch(console.error);
  }
  if (command === 'cowsay') {
    //message.react('🐄').then(console.log).catch(console.error);
    try {
      cowsay(param);
    } catch (error) {
      console.log(error);
      return;
    }
    message.react('🐄').then(console.log).catch(console.error);
    const output = cowsay(param);
    if (command === 'cowsay' && output.length > 2000) {
      message.react('😔').then(console.log).catch(console.error);
      message
        .reply({
          content: 'exceeds the 2000 character limit',
        })
        .catch(console.error);
    }
    message
      .reply(
        `
    \`\`\`
    ${output}
    \`\`\`
    `
      )
      .catch(console.error);
  }
});

client.login(process.env.TOKEN);
