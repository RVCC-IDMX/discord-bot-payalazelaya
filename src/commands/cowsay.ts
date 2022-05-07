import { Message } from 'discord.js';
import cowsay from '../utils/cowsay';

export default {
  callback: (message: Message, ...args: string[]) => {
    const PREFIX = process.env.PREFIX || 'paz!';
    const check = message.content
      .toLowerCase()
      .substring(PREFIX.length)
      .slice()
      .trim()
      .split(/ /);
    const command = check.shift()!;
    const param = check.pop();

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
  },
};
