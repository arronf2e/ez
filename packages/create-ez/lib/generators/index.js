"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const ora_1 = __importDefault(require("ora"));
const promise_1 = __importDefault(require("simple-git/promise"));
const metalsmith_1 = __importDefault(require("metalsmith"));
const consolidate_1 = require("consolidate");
const inquirer_1 = require("inquirer");
const helper_1 = require("@ez-fe/helper");
class BasicGenerator {
    constructor(meta) {
        this.ignores = [/^.git\/\w*/, /^features.js$/];
        this.renderSpinner = ora_1.default(helper_1.info('Rendering'));
        this.renderTemplate = () => {
            const render = async (files, metalsmith, done) => {
                const fileList = Object.keys(files);
                const metalsmithMetadata = metalsmith.metadata();
                const { ignores } = this;
                await Promise.all(fileList.map((fileName) => {
                    const fileContent = files[fileName].contents.toString();
                    const isIgnored = ignores.some(regex => regex.test(fileName));
                    const needRender = /{{([^{}]+)}}/g.test(fileContent);
                    if (isIgnored) {
                        delete files[fileName];
                    }
                    if (!isIgnored && needRender) {
                        consolidate_1.handlebars.render(fileContent, metalsmithMetadata, (err, res) => {
                            if (err) {
                                helper_1.message.error(`${helper_1.em(`[${fileName}]`)} ${helper_1.info(err.message)}`);
                                done(err, files, metalsmith);
                            }
                            files[fileName].contents = Buffer.from(res, 'utf-8');
                        });
                    }
                }));
                this.renderSpinner.succeed();
                done(null, files, metalsmith);
            };
            return render;
        };
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
        spinner.succeed();
        // message.success(hasTemplate ? 'Template update completed!' : 'Template download completed!');
    }
    async queryFeatures() {
        const { templatePath } = this;
        try {
            const { features } = await helper_1.dynamicImport(path_1.resolve(templatePath, 'features'));
            return await inquirer_1.prompt(features);
        }
        catch (e) {
            return {};
        }
    }
    async build() {
        const { cwd } = process;
        const currentWorkDir = cwd();
        const { templatePath, meta } = this;
        const { name } = meta;
        const features = await this.queryFeatures();
        this.renderSpinner.start();
        metalsmith_1.default(__dirname)
            .metadata(Object.assign(Object.assign({}, features), meta))
            .source(templatePath)
            .destination(name === '.' ? currentWorkDir : path_1.resolve(currentWorkDir, name))
            .clean(true)
            .use(this.renderTemplate())
            .build((err) => {
            if (err) {
                helper_1.message.error(err.message);
                process.exit(-1);
            }
        });
    }
}
exports.BasicGenerator = BasicGenerator;
