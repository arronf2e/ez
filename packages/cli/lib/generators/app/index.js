"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const inquirer_1 = require("inquirer");
const fs_1 = require("fs");
const generators_1 = require("@/generators");
const helpers_1 = require("@/helpers");
class Generator extends generators_1.BasicGenerator {
    constructor(meta) {
        super();
        this.meta = meta;
    }
    async prompt() {
        const metaPath = path_1.resolve(__dirname, './meta.json');
        if (fs_1.existsSync(metaPath)) {
            const { inquirer } = await helpers_1.dynamicImport(metaPath);
            return await inquirer_1.prompt(inquirer);
        }
        return {};
    }
    async build() {
        const data = await this.prompt();
        console.log(data);
    }
}
exports.Generator = Generator;
exports.default = Generator;
