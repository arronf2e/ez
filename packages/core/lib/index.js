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
        /** 配置文件路径集合 */
        this.configPaths = [];
        /** 项目源码路径 */
        this.sourcePath = '';
        /** 项目配置 */
        this.config = {};
        this.cwd = process.cwd();
        this.isWin = helper_1.isWin();
        this.init();
    }
    async init() {
        const { cwd, isWin } = this;
        this.loadPkgInfo();
        this.resolveSource();
        this.configPaths = await get_config_1.getConfigPaths({ cwd, isWin });
        this.config = await get_config_1.getUserConfig(this.configPaths);
        debug(`config:${JSON.stringify(this.config)}`);
    }
    async loadPkgInfo() {
        const pkgInfo = await helper_1.getPkgInfo({ cwd: this.cwd });
        this.pkgInfo = pkgInfo;
        debug(`pkgInfo:${JSON.stringify(this.pkgInfo)}`);
    }
    resolveSource() {
        const { cwd } = this;
        const normalSource = path_1.resolve(cwd, 'src');
        const source = fs_1.existsSync(normalSource) ? normalSource : cwd;
        this.sourcePath = source;
        debug(`sourcePath: ${this.sourcePath}`);
    }
}
exports.default = Ez;
