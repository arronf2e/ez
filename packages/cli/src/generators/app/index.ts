import { resolve } from 'path';
// import { prompt } from 'inquirer';
import { Generator, Meta, GeneratorMeta } from '@/generators';
// import { message } from '@/helpers';
import { dynamicImport } from '@/helpers';

interface Data {}

export class AppGenerator extends Generator<Data> {
  constructor(meta: GeneratorMeta) {
    super(meta);
  }

  async prompt() {
    try {
      const a = await dynamicImport<Meta>(resolve(__dirname, './meta.json'));
      console.log(a);
    } catch (e) {
      return {};
    }
  }

  build() {
    const data = this.prompt();
    console.log(data);
  }
}
