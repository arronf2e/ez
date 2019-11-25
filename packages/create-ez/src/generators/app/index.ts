import { BasicGenerator, GeneratorMeta } from '@/generators';

export class Generator extends BasicGenerator {
  constructor(meta: GeneratorMeta) {
    super(meta);
  }

  async run() {
    await this.updateTemplate({
      remoteUrl: 'https://gitee.com/ez-fe/react-admin-template.git',
    });

    this.render();
  }
}
