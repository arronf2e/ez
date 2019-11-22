"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_symbols_1 = __importDefault(require("log-symbols"));
const highlights_1 = require("./highlights");
exports.message = {
    success: (msg) => console.log(log_symbols_1.default.info, highlights_1.success(msg)),
    info: (msg) => console.log(log_symbols_1.default.info, highlights_1.info(msg)),
    warning: (msg) => console.log(log_symbols_1.default.info, highlights_1.warning(msg)),
    error: (msg) => console.log(log_symbols_1.default.error, highlights_1.error(msg)),
};
