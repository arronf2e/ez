import { resolve } from 'path';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import ora from 'ora';
import Git from 'simple-git/promise';
import Metalsmith, { Plugin, Callback } from 'metalsmith';
import { handlebars } from 'consolidate';
import { prompt, Question } from 'inquirer';
import { dynamicImport, message, info, em, Signale } from '@ez-fe/helper';

export interface Meta {
  name: string;
  description?: string;
  boilerplateType: string;
}

export interface Generator {
  meta: Meta;
  templatePath: string;
  queryFeatures(): object;
  updateTemplate({ templatePath, remoteUrl }: { templatePath: string; remoteUrl: string }): void;
  build(): void;
  run(): void;
}

export abstract class BasicGenerator implements Generator {
  meta: Meta;

  templatePath: string;

  ignores: RegExp[] = [/^.git\/\w*/, /^features.js$/];

  renderSpinner = ora(info('rendering'));

  constructor(meta: Meta) {
    const { boilerplateType } = meta;

    this.meta = meta;
    this.templatePath = resolve(__dirname, boilerplateType, 'template');
  }

  async updateTemplate({ remoteUrl }: { remoteUrl: string }) {
    const template = new Signale({
      interactive: true,
      disabled: false,
      stream: process.stdout,
      config: {
        displayTimestamp: true,
      },
    });
    const { templatePath } = this;

    const hasTemplate = existsSync(templatePath);
    if (!hasTemplate) {
      mkdirSync(templatePath);
    }

    const git = Git(templatePath);

    try {
      template.await(`[%d/2] - ${hasTemplate ? 'updating template' : 'downloading template'}`, 1);
      if (!hasTemplate) {
        await git.clone(remoteUrl, templatePath);
      } else {
        await git.checkout('master');
        await git.reset('hard');
        await git.pull('origin', 'master');
      }
    } catch (e) {
      template.error(`[%d/2] - ${e}`, 2);
      process.exit(-1);
    }
    template.success(`[%d/2] - ${hasTemplate ? 'template update completed!' : 'template download completed!'}`, 2);
  }

  async queryFeatures(): Promise<object> {
    const { templatePath } = this;
    try {
      const { features } = await dynamicImport<{ features: Question[] }>(resolve(templatePath, 'features'));
      return await prompt(features);
    } catch (e) {
      return {};
    }
  }

  async checkFolderIsEmpty({ destination }: { destination: string }) {
    const existed = existsSync(destination);
    if (!existed) return true;

    const hasChildren = existed || readdirSync(destination).length;
    if (hasChildren) {
      const { overWrite } = await prompt([
        {
          name: 'overWrite',
          message: 'The destination folder is not empty, whether to overwrite?',
          type: 'confirm',
        },
      ]);

      return overWrite;
    }
  }

  renderTemplate = () => {
    const render: Plugin = async (files: any, metalsmith: any, done: Callback): Promise<void> => {
      const fileList = Object.keys(files);
      const metalsmithMetadata = metalsmith.metadata();
      const { ignores } = this;

      await Promise.all(
        fileList.map((fileName: string) => {
          const fileRenderer = new Signale({
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
            handlebars.render(fileContent, metalsmithMetadata, (err: Error, res: string) => {
              if (err) {
                message.error(`${em(`[${fileName}]`)} ${info(err.message)}`);
                done(err, files, metalsmith);
              }
              files[fileName].contents = Buffer.from(res, 'utf-8');
              fileRenderer.success(fileName);
            });
          }
        })
      );

      message.success('template rendered successfully!');
      done(null, files, metalsmith);
    };

    return render;
  };

  async build() {
    const { cwd } = process;
    const currentWorkDir = cwd();
    const { templatePath, meta } = this;
    let { name } = meta;
    let destination = resolve(currentWorkDir, name);

    if (name === '.') {
      /** 针对当前文件夹初始化特殊处理 */
      destination = currentWorkDir;
      Object.assign(this.meta, { name: 'react-admin' });
    }

    const overWrite = await this.checkFolderIsEmpty({ destination });

    if (!overWrite) {
      message.info('operation cancelled!');
      process.exit(-1);
    }

    const features = await this.queryFeatures();

    Metalsmith(__dirname)
      .metadata({ ...features, ...meta })
      .source(templatePath)
      .destination(destination)
      .clean(false)
      .use(this.renderTemplate())
      .build((err: Error | null) => {
        if (err) {
          message.error(err.message);
          process.exit(-1);
        }
      });
  }

  abstract run(): void;
}
