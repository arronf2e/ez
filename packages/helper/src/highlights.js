"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
/** 成功文本 */
exports.success = chalk_1.green.bold;
/** 警告文本 */
exports.warning = chalk_1.yellow.bold;
/** 信息文本 */
exports.info = chalk_1.gray.underline;
/** 错误文本 */
exports.error = chalk_1.red.bold;
/** 文本强调标识 */
exports.em = chalk_1.cyan.bold.italic;
