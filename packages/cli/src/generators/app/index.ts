import { BasicGenerator, GeneratorMeta } from '@/generators';

export class Generator extends BasicGenerator {
  constructor(meta: GeneratorMeta) {
    super(meta);
  }

  async run() {
    const data = await this.prompt();
    await this.updateTemplate({
      remoteUrl: 'https://gitee.com/ez-fe/react-admin-template.git',
    });
    this.render();
    console.log(data);
  }
}
