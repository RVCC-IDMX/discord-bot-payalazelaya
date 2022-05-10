import { Message, MessageEmbed } from 'discord.js';
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

    const output = cowsay(param);

    const exampleEmbed = new MessageEmbed()
      .setColor('#4260f5')
      .setTitle('The Field of Cows')
      .setDescription(`\`\`\`${output}\`\`\``)
      .setImage('https://i.imgur.com/8kFppOO.jpeg')
      .setThumbnail('https://i.imgur.com/m4vESW2.jpeg')
      .setURL('https://github.com/piuccio/cowsay/tree/master/cows')
      .addField('Current Cow:', param, true);

    message.channel.send({ embeds: [exampleEmbed] });
  },
};
