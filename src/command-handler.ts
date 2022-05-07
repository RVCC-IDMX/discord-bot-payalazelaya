import { Client } from 'discord.js';
import getFiles from './get-files';
import dotenv from 'dotenv';

dotenv.config;

let suffix = '.ts';
let src = 'src';
if (process.env.NODE_ENV === 'production') {
  suffix = '.js';
  src = 'dist';
  console.log('Running in production mode');
}

const PREFIX = process.env.PREFIX || 'paz!';

export default (client: Client) => {
  const commands = {} as {
    [key: string]: any;
  };

  const commandFiles = getFiles(src, './commands', suffix);
  console.log(commandFiles);

  for (const command of commandFiles) {
    let commandFile = require(command);
    if (commandFile.default) commandFile = commandFile.default;

    const split = command.replace(/\\/g, '/').split('/');
    const commandName = split[split.length - 1].replace(suffix, '');

    commands[commandName.toLowerCase()] = commandFile;
  }

  console.log(commands);

  client.on('messageCreate', (message) => {
    const CHANNELS = process.env.CHANNELS || null;
    const channels = CHANNELS.split(',');
    // const pre = 'paz!';
    if (!channels.includes(message.channel.id)) return;
    console.log(message.content);
    if (message.author.bot || !message.content.startsWith(PREFIX)) {
      // console.log(message.content, message.author.bot);
      return;
    }
    // console.log(message.content);
    //  const PREFIX = process.env.PREFIX || 'paz!';
    //  const check = message.content;
    //  const bool = check.startsWith(PREFIX);
    //  if (bool != true) {
    //    return;
    //  }

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift()!.toLowerCase();

    if (!commands[commandName]) {
      return;
    }

    try {
      commands[commandName].callback(message, ...args);
    } catch (error) {
      console.error(error);
    }
  });
};
