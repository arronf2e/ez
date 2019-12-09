"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const helper_1 = require("@ez-fe/helper");
const debug = debug_1.default('ez:core');
class Ez {
    constructor() {
        const { cwd } = process;
        this.cwd = cwd();
        debug('初始化');
        debug(`CWD:${this.cwd}`);
        const pkg = helper_1.getPkgInfo({ cwd: this.cwd });
        this.pkgInfo = pkg.packageJson;
    }
}
exports.default = Ez;
