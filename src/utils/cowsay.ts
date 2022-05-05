import * as cowsay from 'cowsay';
import getRandomInt from './random';
import quotes from './quotes.json';

/*
Get a random number from getRandomInt
That number will result in a specific object from the quotes array
Use that object to access the properties, quote and author
Format the values of quote and author to a string
Pass the string into the default function below
*/

export default function (animal: any) {
  const rand = getRandomInt(0, 25);
  const val = quotes[rand];
  const quoteMessage = val.quote;
  const author = val.author;
  const ops = {
    text: `${quoteMessage} - ${author}`,
    e: 'oo',
    f: animal,
    r: false,
  };
  if (!animal) {
    ops.r = true;
  }
  let output;
  try {
    output = cowsay.say(ops);
  } catch {
    console.error('error');
    output = `${animal} does not exist`;
  }
  return output;
}
