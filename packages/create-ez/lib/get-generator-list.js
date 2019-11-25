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
const fs_1 = require("fs");
const helper_1 = require("@ez-fe/helper");
/** 过滤非文件夹与隐藏文件 */
const filterSpecified = ({ generatorsDir, target }) => {
    const targetPath = path_1.resolve(generatorsDir, target);
    if (fs_1.existsSync(targetPath) && fs_1.statSync(targetPath).isDirectory() && !target.startsWith('.')) {
        return true;
    }
    return false;
};
/** 补充元信息 */
const addMetaInformation = async ({ generatorsDir, target }) => {
    const targetMetaPath = path_1.resolve(generatorsDir, target, 'meta.json');
    if (fs_1.existsSync(targetMetaPath)) {
        const hasMetaData = fs_1.statSync(targetMetaPath).isFile();
        if (hasMetaData) {
            const { name, description } = await Promise.resolve().then(() => __importStar(require(targetMetaPath)));
            return {
                name: `${name} ${helper_1.info(description)}`,
                value: target,
            };
        }
    }
    return {
        name: target,
        value: target,
    };
};
exports.getGeneratorList = async () => {
    try {
        const generatorsDir = path_1.resolve(__dirname, 'generators');
        return await Promise.all(fs_1.readdirSync(generatorsDir)
            .filter(target => filterSpecified({ generatorsDir, target }))
            .map(async (target) => await addMetaInformation({ generatorsDir, target })));
    }
    catch (e) {
        helper_1.message.error(e);
        process.exit(-1);
    }
};
