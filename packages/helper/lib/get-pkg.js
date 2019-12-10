"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const message_1 = require("./message");
const dynamic_import_1 = require("./dynamic-import");
async function getPkgInfo({ cwd }) {
    try {
        const packagePath = path_1.resolve(cwd, 'package.json');
        return await dynamic_import_1.dynamicImport(packagePath);
    }
    catch (e) {
        message_1.message.error('No related package configuration found!');
        process.exit(-1);
    }
}
exports.getPkgInfo = getPkgInfo;
