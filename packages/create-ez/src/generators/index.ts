import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import ora from 'ora';
import Git from 'simple-git/promise';
// import Metalsmith from 'metalsmith';
import { prompt, Question } from 'inquirer';
import { dynamicImport, message, info } from '@ez-fe/helper';

export interface Meta {
  name: string;
  description?: string;
  boilerplateType: string;
}

export type GeneratorMeta = Pick<Meta, 'boilerplateType'>;

export interface Generator {
  meta: GeneratorMeta;
  templatePath: string;
  queryFeatures(): object;
  updateTemplate({ templatePath, remoteUrl }: { templatePath: string; remoteUrl: string }): void;
  run(): void;
}

export abstract class BasicGenerator implements Generator {
  meta: GeneratorMeta;

  templatePath: string;

  constructor(meta: GeneratorMeta) {
    const { boilerplateType } = meta;

    this.meta = meta;
    this.templatePath = resolve(__dirname, boilerplateType, 'template');
  }

  async updateTemplate({ remoteUrl }: { remoteUrl: string }) {
    const { templatePath } = this;

    const hasTemplate = existsSync(templatePath);
    if (!hasTemplate) {
      mkdirSync(templatePath);
    }

    const git = Git(templatePath);
    const spinner = ora(info(hasTemplate ? 'Updating template...' : 'Downloading template...'));

    try {
      spinner.start();
      if (!hasTemplate) {
        await git.clone(remoteUrl, templatePath);
      } else {
        await git.checkout('master');
        await git.reset('hard');
        await git.pull('origin', 'master');
      }
    } catch (e) {
      message.error(e);
      process.exit(-1);
    }
    spinner.stop();
    message.success(hasTemplate ? 'Template update completed!' : 'Template download completed!');
  }

  async queryFeatures(): Promise<object> {
    const { templatePath } = this;
    try {
      const { features } = await dynamicImport<{ features: Question[] }>(resolve(templatePath, 'features'));
      return await prompt(features);
    } catch (e) {
      message.error(e);
      return {};
    }
  }

  async render() {
    const { templatePath } = this;
    const features = await this.queryFeatures();
    console.log(templatePath);
    console.log(features);
  }

  abstract run(): void;
}
