"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const debug_1 = __importDefault(require("debug"));
const helper_1 = require("@ez-fe/helper");
const debug = debug_1.default('ez:core');
function getConfigPaths({ cwd, isWin }) {
    const configs = ['config/'];
    let configPaths = configs.map(config => path_1.join(cwd, config));
    configPaths = isWin ? configPaths.map(helper_1.formatWinPath) : configPaths;
    debug(`configPaths: ${configPaths}`);
    return configPaths;
}
exports.getConfigPaths = getConfigPaths;
function getUserConfig(configPaths) {
    return {};
}
exports.getUserConfig = getUserConfig;
