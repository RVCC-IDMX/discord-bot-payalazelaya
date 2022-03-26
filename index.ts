import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from './utils/cowsay';

const output = cowsay();
//console.log(output);

dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (message.content === 'ping') {
    message.react('😄').then(console.log).catch(console.error);
    message
      .reply({
        content: 'pong',
      })
      .catch(console.error);
  }
  if (message.content === 'cowsay') {
    message.react('🐄').then(console.log).catch(console.error);
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
  if (message.content === 'cowsay' && output.length > 2000) {
    message.react('😔').then(console.log).catch(console.error);
    message
      .reply({
        content: 'exceeds the 2000 character limit',
      })
      .catch(console.error);
  }
});

client.login(process.env.TOKEN);
