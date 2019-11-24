"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const inquirer_1 = require("inquirer");
const ora_1 = __importDefault(require("ora"));
const promise_1 = __importDefault(require("simple-git/promise"));
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
    async updateTemplate() {
        const templatePath = path_1.resolve(__dirname, 'template');
        const hasTemplate = fs_1.existsSync(templatePath);
        if (!hasTemplate) {
            fs_1.mkdirSync(templatePath);
        }
        const git = promise_1.default(templatePath);
        if (!hasTemplate) {
            await git.init();
            await git.addRemote('origin', 'https://gitee.com/ez-fe/react-admin-template.git');
        }
        const spinner = ora_1.default(helpers_1.info('Updating template'));
        try {
            spinner.start();
            await git.pull('origin', 'master', { '--rebase': 'true' });
            spinner.stop();
        }
        catch (e) {
            spinner.stop();
            helpers_1.message.error(e);
        }
    }
    async build() {
        const data = await this.prompt();
        await this.updateTemplate();
        helpers_1.message.success('Template update completed!');
        console.log(data);
    }
}
exports.Generator = Generator;
exports.default = Generator;
