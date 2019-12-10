"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const message_1 = require("./message");
async function getPkgInfo({ cwd }) {
    try {
        return (await Promise.resolve().then(() => __importStar(require(path_1.resolve(cwd, 'package.json')))));
    }
    catch (e) {
        message_1.message.error('No related package configuration found!');
        process.exit(-1);
    }
}
exports.getPkgInfo = getPkgInfo;
