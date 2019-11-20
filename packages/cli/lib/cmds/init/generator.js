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
const helper_1 = require("../../helper");
exports.getGeneratorList = async () => {
    const templatesPath = path_1.resolve(__dirname, '..', '..', '..', 'templates');
    try {
        return await Promise.all(fs_1.readdirSync(templatesPath)
            .filter(target => !target.startsWith('.'))
            .map(async (target) => {
            const targetMetaPath = path_1.resolve(templatesPath, target, 'meta.json');
            const hasMetaData = fs_1.statSync(targetMetaPath).isFile();
            if (hasMetaData) {
                const { default: metaData } = await Promise.resolve().then(() => __importStar(require(targetMetaPath)));
                return {
                    name: `${metaData.name} ${helper_1.info(metaData.description)}`,
                    value: target,
                };
            }
            return { name: target, value: target };
        }));
    }
    catch (e) {
        return [];
    }
};
