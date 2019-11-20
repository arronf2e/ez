import YeomanGenerator from 'yeoman-generator';

export class Generator extends YeomanGenerator {
  constructor(...args: [string | string[], object]) {
    super(...args);
  }

  writing() {
    console.log('writing');
  }
}
