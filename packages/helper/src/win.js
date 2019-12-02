"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var slash_1 = __importDefault(require("slash"));
function isWin() {
    return process.platform.includes('win');
}
exports.isWin = isWin;
function formatWinPath(path) {
    return slash_1.default(path);
}
exports.formatWinPath = formatWinPath;
