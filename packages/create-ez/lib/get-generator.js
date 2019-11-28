"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("@ez-fe/helper");
async function getGenerator(meta) {
    try {
        const { boilerplateType } = meta;
        const { Generator } = await helper_1.dynamicImport(`@/generators/${boilerplateType}`);
        return new Generator(meta);
    }
    catch (e) {
        helper_1.message.error('Generator not found!');
        throw e;
    }
}
exports.getGenerator = getGenerator;
