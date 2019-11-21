import { resolve } from 'path';
import { prompt } from 'inquirer';
import { BasicGenerator, Meta, GeneratorMeta } from '@/generators';
import { dynamicImport } from '@/helpers';

interface Data {}

export class Generator extends BasicGenerator<Data> {
  meta: GeneratorMeta;

  constructor(meta: GeneratorMeta) {
    super();
    this.meta = meta;
  }

  async prompt() {
    try {
      const metaPath = resolve(__dirname, './meta.json');
      const { inquirer } = await dynamicImport<Meta>(metaPath);
      return await prompt(inquirer);
    } catch (e) {
      return {};
    }
  }

  async build() {
    const data = await this.prompt();
    console.log(data);
  }
}

export default Generator;
