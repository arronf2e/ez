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
        this.renderSpinner = ora_1.default(helper_1.info('rendering'));
        this.renderTemplate = () => {
            const render = async (files, metalsmith, done) => {
                const fileList = Object.keys(files);
                const metalsmithMetadata = metalsmith.metadata();
                const total = fileList.length;
                const { ignores } = this;
                await Promise.all(fileList.map((fileName) => {
                    const fileRenderer = new helper_1.Signale({
                        interactive: true,
                        disabled: false,
                        stream: process.stdout,
                        config: {
                            displayTimestamp: true,
                        },
                    });
                    const fileContent = files[fileName].contents.toString();
                    const isIgnored = ignores.some(regex => regex.test(fileName));
                    const needRender = /{{([^{}]+)}}/g.test(fileContent);
                    if (isIgnored) {
                        delete files[fileName];
                    }
                    if (!isIgnored && needRender) {
                        fileRenderer.await(fileName);
                        consolidate_1.handlebars.render(fileContent, metalsmithMetadata, (err, res) => {
                            if (err) {
                                helper_1.message.error(`${helper_1.em(`[${fileName}]`)} ${helper_1.info(err.message)}`);
                                done(err, files, metalsmith);
                            }
                            files[fileName].contents = Buffer.from(res, 'utf-8');
                            fileRenderer.success(fileName);
                        });
                    }
                }));
                helper_1.message.success('template rendered successfully!');
                done(null, files, metalsmith);
            };
            return render;
        };
        const { boilerplateType } = meta;
        this.meta = meta;
        this.templatePath = path_1.resolve(__dirname, boilerplateType, 'template');
    }
    async updateTemplate({ remoteUrl }) {
        const template = new helper_1.Signale({
            interactive: true,
            disabled: false,
            stream: process.stdout,
            config: {
                displayTimestamp: true,
            },
        });
        const { templatePath } = this;
        const hasTemplate = fs_1.existsSync(templatePath);
        if (!hasTemplate) {
            fs_1.mkdirSync(templatePath);
        }
        const git = promise_1.default(templatePath);
        try {
            template.await(`[%d/2] - ${hasTemplate ? 'updating template' : 'downloading template'}`, 1);
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
            template.error(`[%d/2] - ${e}`, 2);
            process.exit(-1);
        }
        template.success(`[%d/2] - ${hasTemplate ? 'template update completed!' : 'template download completed!'}`, 2);
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
    async checkFolderIsEmpty({ destination }) {
        const existed = fs_1.existsSync(destination);
        if (!existed)
            return true;
        const hasChildren = existed || fs_1.readdirSync(destination).length;
        if (hasChildren) {
            const { overWrite } = await inquirer_1.prompt([
                {
                    name: 'overWrite',
                    message: 'The destination folder is not empty, whether to overwrite?',
                    type: 'confirm',
                },
            ]);
            return overWrite;
        }
    }
    async build() {
        const { cwd } = process;
        const currentWorkDir = cwd();
        const { templatePath, meta } = this;
        let { name } = meta;
        let destination = path_1.resolve(currentWorkDir, name);
        if (name === '.') {
            /** 针对当前文件夹初始化特殊处理 */
            destination = currentWorkDir;
            Object.assign(this.meta, { name: 'react-admin' });
        }
        const overWrite = await this.checkFolderIsEmpty({ destination });
        if (!overWrite) {
            helper_1.message.info('operation cancelled!');
            process.exit(-1);
        }
        const features = await this.queryFeatures();
        metalsmith_1.default(__dirname)
            .metadata(Object.assign(Object.assign({}, features), meta))
            .source(templatePath)
            .destination(destination)
            .clean(false)
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
