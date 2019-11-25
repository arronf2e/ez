import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import ora from 'ora';
import Git from 'simple-git/promise';
import { prompt, Question } from 'inquirer';
import { dynamicImport, message, info } from '@/helpers';
import Metalsmith from 'metalsmith';

export interface Meta {
  name: string;
  boilerplateType: string;
  description?: string;
  inquirer: Question[];
}

export type GeneratorMeta = Pick<Meta, 'boilerplateType'>;

export interface Generator {
  meta: GeneratorMeta;
  questionsPath: string;
  templatePath: string;
  prompt(): object;
  updateTemplate({ templatePath, remoteUrl }: { templatePath: string; remoteUrl: string }): void;
  run(): void;
}

export abstract class BasicGenerator implements Generator {
  meta: GeneratorMeta;

  questionsPath: string;

  templatePath: string;

  constructor(meta: GeneratorMeta) {
    const { boilerplateType } = meta;

    this.meta = meta;
    this.questionsPath = resolve(__dirname, boilerplateType, 'questions');
    this.templatePath = resolve(__dirname, boilerplateType, 'template');
  }

  async prompt(): Promise<object> {
    const { questionsPath } = this;
    try {
      const { questions } = await dynamicImport<{ questions: Question[] }>(questionsPath);
      return await prompt(questions);
    } catch (e) {
      message.error(e);
      return {};
    }
  }

  async updateTemplate({ remoteUrl }: { remoteUrl: string }) {
    const { templatePath } = this;

    const hasTemplate = existsSync(templatePath);
    if (!hasTemplate) {
      mkdirSync(templatePath);
    }

    const git = Git(templatePath);

    if (!hasTemplate) {
      await git.init();
      await git.addRemote('origin', remoteUrl);
    }

    const spinner = ora(info(hasTemplate ? 'Updating template...' : 'Downloading template...'));

    try {
      spinner.start();
      await git.pull('origin', 'master', {
        '--rebase': 'true',
      });
      spinner.stop();
      message.success(hasTemplate ? 'Template update completed!' : 'Template download completed!');
    } catch (e) {
      spinner.stop();
      message.error(e);
    }
  }

  async render() {
    const { templatePath } = this;
    console.log(process.cwd());
    Metalsmith(process.cwd())
      .metadata({
        name: 'test',
        description: 'ddd',
      })
      .source(templatePath)
      // .destination()
      .clean(false);
  }

  abstract run(): void;
}
