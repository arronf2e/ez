import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { prompt } from 'inquirer';
import ora from 'ora';
import gitP from 'simple-git/promise';
import { BasicGenerator, Meta, GeneratorMeta } from '@/generators';
import { dynamicImport, message, info } from '@/helpers';

interface Data {}

export class Generator extends BasicGenerator<Data> {
  meta: GeneratorMeta;

  constructor(meta: GeneratorMeta) {
    super();
    this.meta = meta;
  }

  async prompt() {
    const metaPath = resolve(__dirname, './meta.json');

    if (existsSync(metaPath)) {
      const { inquirer } = await dynamicImport<Meta>(metaPath);
      return await prompt(inquirer);
    }

    return {};
  }

  async updateTemplate() {
    const templatePath = resolve(__dirname, 'template');
    const hasTemplate = existsSync(templatePath);
    if (!hasTemplate) {
      mkdirSync(templatePath);
    }

    const git = gitP(templatePath);

    if (!hasTemplate) {
      await git.init();
      await git.addRemote('origin', 'https://gitee.com/ez-fe/react-admin-template.git');
    }

    const spinner = ora(info('Updating template'));
    try {
      spinner.start();
      await git.pull('origin', 'master', { '--rebase': 'true' });
      spinner.stop();
    } catch (e) {
      spinner.stop();
      message.error(e);
    }
  }

  async build() {
    const data = await this.prompt();
    await this.updateTemplate();
    message.success('Template update completed!');
    console.log(data);
  }
}

export default Generator;
