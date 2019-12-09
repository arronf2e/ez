import { resolve } from 'path';
import { existsSync } from 'fs';
import createDebug from 'debug';
import { getPkgInfo, PkgInfo, isWin } from '@ez-fe/helper';

import { getConfigPaths, getUserConfig } from './get-config';
import { Config } from './interface';

const debug = createDebug('ez:core');

export default class Ez {
  /** isWin */
  private isWin: boolean;
  /** 当前工作路径 */
  private cwd: string;
  /** 配置文件路径集合 */
  private configPaths: string[];
  /** 当前项目信息 */
  private pkgInfo: PkgInfo['packageJson'];
  /** 项目源码路径 */
  private sourcePath: string;
  /** 项目配置 */
  private config: Config;

  constructor() {
    const cwd = process.cwd();

    this.cwd = cwd;
    this.isWin = isWin();
    this.pkgInfo = this.loadPkgInfo();
    this.sourcePath = this.resolveSource();
    this.configPaths = getConfigPaths({ cwd, isWin: this.isWin });
    this.config = getUserConfig(this.configPaths);
  }

  loadPkgInfo(): PkgInfo['packageJson'] {
    const pkg = getPkgInfo({ cwd: this.cwd });
    debug(`pkgInfo:${pkg!.packageJson}`);

    return pkg!.packageJson;
  }

  resolveSource(): string {
    const { cwd } = this;
    const normalSource = resolve(cwd, 'src');
    const source = existsSync(normalSource) ? normalSource : cwd;
    debug(`sourcePath: ${source}`);

    return source;
  }
}
