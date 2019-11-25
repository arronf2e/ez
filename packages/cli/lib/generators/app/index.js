"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generators_1 = require("@/generators");
class Generator extends generators_1.BasicGenerator {
    constructor(meta) {
        super(meta);
    }
    async run() {
        const data = await this.prompt();
        await this.updateTemplate({
            remoteUrl: 'https://gitee.com/ez-fe/react-admin-template.git',
        });
        this.render();
        console.log(data);
    }
}
exports.Generator = Generator;
