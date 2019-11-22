"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@/helpers");
async function getGenerator(boilerplateType) {
    try {
        const { Generator } = await helpers_1.dynamicImport(`@/generators/${boilerplateType}`);
        return new Generator({ boilerplateType });
    }
    catch (e) {
        helpers_1.message.error('Generator not found!');
        throw e;
    }
}
exports.getGenerator = getGenerator;
