"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const generators_1 = require("@/generators");
class Generator extends generators_1.BasicGenerator {
    constructor(meta) {
        super(meta);
    }
    async build() {
        const metaPath = path_1.resolve(__dirname, './meta.json');
        const data = await this.prompt({ metaPath });
        const templatePath = path_1.resolve(__dirname, 'template');
        await this.updateTemplate({
            templatePath,
            remoteUrl: 'https://gitee.com/ez-fe/react-admin-template.git',
        });
        console.log(data);
    }
}
exports.Generator = Generator;
