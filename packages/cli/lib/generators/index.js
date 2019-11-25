"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const ora_1 = __importDefault(require("ora"));
const promise_1 = __importDefault(require("simple-git/promise"));
const inquirer_1 = require("inquirer");
const helpers_1 = require("@/helpers");
const metalsmith_1 = __importDefault(require("metalsmith"));
class BasicGenerator {
    constructor(meta) {
        const { boilerplateType } = meta;
        this.meta = meta;
        this.questionsPath = path_1.resolve(__dirname, boilerplateType, 'questions');
        this.templatePath = path_1.resolve(__dirname, boilerplateType, 'template');
    }
    async prompt() {
        const { questionsPath } = this;
        try {
            const { questions } = await helpers_1.dynamicImport(questionsPath);
            return await inquirer_1.prompt(questions);
        }
        catch (e) {
            helpers_1.message.error(e);
            return {};
        }
    }
    async updateTemplate({ remoteUrl }) {
        const { templatePath } = this;
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
    async render() {
        const { templatePath } = this;
        console.log(process.cwd());
        metalsmith_1.default(process.cwd())
            .metadata({
            name: 'test',
            description: 'ddd',
        })
            .source(templatePath)
            // .destination()
            .clean(false);
    }
}
exports.BasicGenerator = BasicGenerator;
