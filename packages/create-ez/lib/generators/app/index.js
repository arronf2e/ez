"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generators_1 = require("@/generators");
const meta_json_1 = require("./meta.json");
class Generator extends generators_1.BasicGenerator {
    constructor(meta) {
        super(meta);
    }
    async run() {
        await this.updateTemplate({
            remoteUrl: meta_json_1.remoteUrl,
        });
        this.build();
    }
}
exports.Generator = Generator;
