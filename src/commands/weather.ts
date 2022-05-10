import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default {
  callback: (message: Message, ...args: string[]) => {
    let param;
    if (args.length > 1) {
      param = `${args[0]} ${args[1]}`;
    } else {
      param = args;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${process.env.WEATHER_ACCESS_KEY}`;
    console.log(url);

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${process.env.WEATHER_ACCESS_KEY}`
      )
      .then((data) => {
        // Temperature
        const kelvin = data.data.main.temp;
        const kevlow = data.data.main.temp_min;
        const kevhigh = data.data.main.temp_max;
        const temp = Math.round(1.8 * (kelvin - 273.15) + 32);
        const templow = Math.round(1.8 * (kevlow - 273.15) + 32);
        const temphigh = Math.round(1.8 * (kevhigh - 273.15) + 32);

        // UTC Conversion
        const dateObj = new Date(
          (data.data.sys.sunrise + data.data.timezone) * 1000
        );
        const utcString = dateObj.toUTCString();
        const rise_time = utcString.slice(-11, -4);

        const dateObjTwo = new Date(
          (data.data.sys.sunset + data.data.timezone) * 1000
        );
        const utcStringTwo = dateObjTwo.toUTCString();
        const set_time = utcStringTwo.slice(-11, -4);

        // Embed Message
        const exampleEmbed = new MessageEmbed()
          .setColor('#4260f5')
          .setTitle(
            `The Current Weather in ${param} - ${data.data.sys.country}`
          )
          .setDescription(
            `${temp}\u00B0F and ${data.data.weather[0].description}`
          )
          .addField('Low', `${templow}\u00B0F`, true)
          .addField('High', `${temphigh}\u00B0F`, true)
          .addFields({ name: '\u200B', value: '\u200B' })
          .addField('Sunrise', `${rise_time} AM`, true)
          .addField('Sunset', `${set_time} PM`, true)
          .setThumbnail(
            `https://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`
          );

        message.channel.send({ embeds: [exampleEmbed] });
      })
      .catch((err) => {
        message.reply('Please enter a city name');
      });
  },
};
