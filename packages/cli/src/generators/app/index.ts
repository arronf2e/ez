// import { prompt } from 'inquirer';
import { Generator, Meta } from '@/generators';
// import { message } from '@/helpers';

interface Data {}

export class AppGenerator extends Generator<Data> {
  constructor(meta: Meta) {
    super(meta);
  }

  async prompt() {
    try {
      await import('./meta.json');
    } catch (e) {
      return {};
    }
  }

  build() {
    const data = this.prompt();
    console.log(data);
  }
}
