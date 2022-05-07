"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    callback: (message, ...args) => {
        let prod;
        prod = parseInt(args[0]) * parseInt(args[1]);
        message.reply(`The product is ${prod}`);
    },
};
