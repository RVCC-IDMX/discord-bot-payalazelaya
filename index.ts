import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const cow = `__________________
< Hello from typescript! >
 ------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
              U ||----w |
                ||     ||`;

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (message.content === 'ping') {
    message.reply({
      content: 'pong',
    });
  }
  if (message.content === 'cowsay') {
    message.reply(`
    \`\`\`
    ${cow}
    \`\`\`
    `);
  }
});

client.login(process.env.TOKEN);
