import { Message } from 'discord.js';

export default {
  callback: (message: Message, ...args: string[]) => {
    let prod;

    prod = parseInt(args[0]) * parseInt(args[1]);

    message.reply(`The product is ${prod}`);
  },
};
