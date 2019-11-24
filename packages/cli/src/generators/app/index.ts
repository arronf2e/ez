import { resolve } from 'path';

import { BasicGenerator, GeneratorMeta } from '@/generators';

export class Generator extends BasicGenerator {
  constructor(meta: GeneratorMeta) {
    super(meta);
  }

  async build() {
    const metaPath = resolve(__dirname, './meta.json');
    const data = await this.prompt({ metaPath });
    const templatePath = resolve(__dirname, 'template');
    await this.updateTemplate({
      templatePath,
      remoteUrl: 'https://gitee.com/ez-fe/react-admin-template.git',
    });
    console.log(data);
  }
}
