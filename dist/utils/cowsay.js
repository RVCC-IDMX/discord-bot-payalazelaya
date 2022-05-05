"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cowsay = tslib_1.__importStar(require("cowsay"));
const random_1 = tslib_1.__importDefault(require("./random"));
const quotes_json_1 = tslib_1.__importDefault(require("./quotes.json"));
function default_1(animal) {
    const rand = (0, random_1.default)(0, 25);
    const val = quotes_json_1.default[rand];
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
    }
    catch {
        console.error('error');
        output = `${animal} does not exist`;
    }
    return output;
}
exports.default = default_1;
