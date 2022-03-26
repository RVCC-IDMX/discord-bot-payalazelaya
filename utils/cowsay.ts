import * as cowsay from 'cowsay';
import getRandomInt from './random';

export default function () {
  let output: string = cowsay.say({
    text: 'Hello from the typescript!',
    r: true,
  });
  return output;
}
