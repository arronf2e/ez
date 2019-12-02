"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signale_1 = require("signale");
const options = {
    disabled: false,
    interactive: false,
    stream: process.stdout,
    config: {
        displayTimestamp: true,
    },
};
const { success, info, warn, error, pending, complete, start } = new signale_1.Signale(options);
exports.message = {
    success: (msg) => success(msg),
    info: (msg) => info(msg),
    warning: (msg) => warn(msg),
    error: (msg) => error(msg),
    start: (msg) => start(msg),
    pending: (msg) => pending(msg),
    complete: (msg) => complete(msg),
};
