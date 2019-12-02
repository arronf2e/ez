"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var semver_1 = require("semver");
var message_1 = require("./message");
/** 检查 Node 版本 */
exports.checkNodeVersion = function () {
    if (!semver_1.satisfies(process.version, '>= 8.0.0')) {
        message_1.message.error('Only work with Node v8.0.0 and up!');
        process.exit(-1);
    }
};
