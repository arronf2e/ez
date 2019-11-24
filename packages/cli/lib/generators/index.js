"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const inquirer_1 = require("inquirer");
const ora_1 = __importDefault(require("ora"));
const promise_1 = __importDefault(require("simple-git/promise"));
const helpers_1 = require("@/helpers");
class BasicGenerator {
    constructor(meta) {
        this.meta = meta;
    }
    async prompt({ metaPath }) {
        if (fs_1.existsSync(metaPath)) {
            const { inquirer } = await helpers_1.dynamicImport(metaPath);
            return await inquirer_1.prompt(inquirer);
        }
        return {};
    }
    async updateTemplate({ templatePath, remoteUrl }) {
        const hasTemplate = fs_1.existsSync(templatePath);
        if (!hasTemplate) {
            fs_1.mkdirSync(templatePath);
        }
        const git = promise_1.default(templatePath);
        if (!hasTemplate) {
            await git.init();
            await git.addRemote('origin', remoteUrl);
        }
        const spinner = ora_1.default(helpers_1.info(hasTemplate ? 'Updating template...' : 'Downloading template...'));
        try {
            spinner.start();
            await git.pull('origin', 'master', {
                '--rebase': 'true',
            });
            spinner.stop();
            helpers_1.message.success(hasTemplate ? 'Template update completed!' : 'Template download completed!');
        }
        catch (e) {
            spinner.stop();
            helpers_1.message.error(e);
        }
    }
}
exports.BasicGenerator = BasicGenerator;
