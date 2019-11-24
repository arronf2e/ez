import { resolve } from 'path';
import { BasicGenerator, GeneratorMeta } from '@/generators';

export class Generator extends BasicGenerator {
  constructor(meta: GeneratorMeta) {
    super(meta);
  }

  async run() {
    const templatePath = resolve(__dirname, 'template');
    const metaPath = resolve(__dirname, './meta.json');

    const data = await this.prompt({ metaPath });
    await this.updateTemplate({
      templatePath,
      remoteUrl: 'https://gitee.com/ez-fe/react-admin-template.git',
    });
    console.log(data);
  }
}
