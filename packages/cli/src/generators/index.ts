import { existsSync, mkdirSync } from 'fs';
import { prompt } from 'inquirer';
import ora from 'ora';
import Git from 'simple-git/promise';
import { Question } from 'inquirer';
import { dynamicImport, message, info } from '@/helpers';

export interface Meta {
  name: string;
  boilerplateType: string;
  description?: string;
  inquirer: Question[];
}

export type GeneratorMeta = Pick<Meta, 'boilerplateType'>;

export interface Generator {
  meta: GeneratorMeta;
  prompt({ metaPath }: { metaPath: string }): object;
  updateTemplate({ templatePath, remoteUrl }: { templatePath: string; remoteUrl: string }): void;
  run(): void;
}

export abstract class BasicGenerator implements Generator {
  meta: GeneratorMeta;

  constructor(meta: GeneratorMeta) {
    this.meta = meta;
  }

  async prompt({ metaPath }: { metaPath: string }): Promise<object> {
    if (existsSync(metaPath)) {
      const { inquirer } = await dynamicImport<Meta>(metaPath);
      return await prompt(inquirer);
    }

    return {};
  }

  async updateTemplate({ templatePath, remoteUrl }: { templatePath: string; remoteUrl: string }) {
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

  abstract run(): void;
}
