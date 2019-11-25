"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const semver_1 = require("semver");
const message_1 = require("./message");
/** 检查 Node 版本 */
exports.checkNodeVersion = () => {
    if (!semver_1.satisfies(process.version, '>= 8.0.0')) {
        message_1.message.error('Only work with Node v8.0.0 and up!');
        process.exit(-1);
    }
};
