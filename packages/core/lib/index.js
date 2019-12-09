"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const debug_1 = __importDefault(require("debug"));
const helper_1 = require("@ez-fe/helper");
const get_config_1 = require("./get-config");
const debug = debug_1.default('ez:core');
class Ez {
    constructor() {
        const cwd = process.cwd();
        this.cwd = cwd;
        this.isWin = helper_1.isWin();
        this.pkgInfo = this.loadPkgInfo();
        this.sourcePath = this.resolveSource();
        this.configPaths = get_config_1.getConfigPaths({ cwd, isWin: this.isWin });
        this.config = get_config_1.getUserConfig(this.configPaths);
    }
    loadPkgInfo() {
        const pkg = helper_1.getPkgInfo({ cwd: this.cwd });
        debug(`pkgInfo:${pkg.packageJson}`);
        return pkg.packageJson;
    }
    resolveSource() {
        const { cwd } = this;
        const normalSource = path_1.resolve(cwd, 'src');
        const source = fs_1.existsSync(normalSource) ? normalSource : cwd;
        debug(`sourcePath: ${source}`);
        return source;
    }
}
exports.default = Ez;
