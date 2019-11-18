"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const semver_1 = require("semver");
const log_symbols_1 = __importDefault(require("log-symbols"));
const highlights_1 = require("./highlights");
exports.checkVersion = () => {
    if (!semver_1.satisfies(process.version, '>= 8.0.0')) {
        console.error(log_symbols_1.default.error, highlights_1.error('Only work with Node v8.0.0 and up!'));
        process.exit(1);
    }
};
