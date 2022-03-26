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

const rand = getRandomInt(0, 25);
const val = quotes[rand];
const quoteMessage = val.quote;
const author = val.author;

export default function () {
  let output: string = cowsay.say({
    text: `${quoteMessage} - ${author}`,
    r: true,
  });
  return output;
}
