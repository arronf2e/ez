import createDebug from 'debug';
import { getPkgInfo, PkgInfo } from '@ez-fe/helper';

const debug = createDebug('ez:core');

export default class Ez {
  protected pkgInfo: PkgInfo['packageJson'];

  protected cwd: string;

  constructor() {
    const { cwd } = process;
    this.cwd = cwd();
    debug('初始化');
    debug(`CWD:${this.cwd}`);
    const pkg = getPkgInfo({ cwd: this.cwd });
    this.pkgInfo = pkg!.packageJson;
  }
}
