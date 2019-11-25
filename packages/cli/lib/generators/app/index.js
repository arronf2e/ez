'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const generators_1 = require('@/generators');
class Generator extends generators_1.BasicGenerator {
  constructor(meta) {
    super(meta);
  }
  async run() {
    await this.updateTemplate({
      remoteUrl: 'https://gitee.com/ez-fe/react-admin-template.git',
    });
    this.render();
  }
}

exports.Generator = Generator;
