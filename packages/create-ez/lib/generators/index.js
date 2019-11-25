"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const ora_1 = __importDefault(require("ora"));
const promise_1 = __importDefault(require("simple-git/promise"));
// import Metalsmith from 'metalsmith';
const inquirer_1 = require("inquirer");
const helper_1 = require("@ez-fe/helper");
class BasicGenerator {
    constructor(meta) {
        const { boilerplateType } = meta;
        this.meta = meta;
        this.templatePath = path_1.resolve(__dirname, boilerplateType, 'template');
    }
    async updateTemplate({ remoteUrl }) {
        const { templatePath } = this;
        const hasTemplate = fs_1.existsSync(templatePath);
        if (!hasTemplate) {
            fs_1.mkdirSync(templatePath);
        }
        const git = promise_1.default(templatePath);
        const spinner = ora_1.default(helper_1.info(hasTemplate ? 'Updating template...' : 'Downloading template...'));
        try {
            spinner.start();
            if (!hasTemplate) {
                await git.clone(remoteUrl, templatePath);
            }
            else {
                await git.checkout('master');
                await git.reset('hard');
                await git.pull('origin', 'master');
            }
        }
        catch (e) {
            helper_1.message.error(e);
            process.exit(-1);
        }
        spinner.stop();
        helper_1.message.success(hasTemplate ? 'Template update completed!' : 'Template download completed!');
    }
    async queryFeatures() {
        const { templatePath } = this;
        try {
            const { features } = await helper_1.dynamicImport(path_1.resolve(templatePath, 'features'));
            return await inquirer_1.prompt(features);
        }
        catch (e) {
            helper_1.message.error(e);
            return {};
        }
    }
    async render() {
        const { templatePath } = this;
        const features = await this.queryFeatures();
        console.log(templatePath);
        console.log(features);
    }
}
exports.BasicGenerator = BasicGenerator;
