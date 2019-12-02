"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var log_symbols_1 = __importDefault(require("log-symbols"));
var highlights_1 = require("./highlights");
exports.message = {
    success: function (msg) { return console.log(log_symbols_1.default.success, highlights_1.success(msg)); },
    info: function (msg) { return console.log(log_symbols_1.default.info, highlights_1.info(msg)); },
    warning: function (msg) { return console.log(log_symbols_1.default.info, highlights_1.warning(msg)); },
    error: function (msg) { return console.log(log_symbols_1.default.error, highlights_1.error(msg)); },
};
