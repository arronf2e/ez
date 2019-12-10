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
  private configPaths: string[] = [];
  /** 当前项目信息 */
  private pkgInfo: PkgInfo['packageJson'];
  /** 项目源码路径 */
  private sourcePath: string = '';
  /** 项目配置 */
  private config: Partial<Config> = {};

  constructor() {
    this.cwd = process.cwd();
    this.isWin = isWin();

    this.init();
  }

  async init() {
    const { cwd, isWin } = this;
    this.loadPkgInfo();
    this.resolveSource();
    this.configPaths = await getConfigPaths({ cwd, isWin });
    this.config = await getUserConfig(this.configPaths);
    debug(`config:${JSON.stringify(this.config)}`);
  }

  async loadPkgInfo() {
    const pkgInfo = await getPkgInfo({ cwd: this.cwd });
    this.pkgInfo = pkgInfo;
    debug(`pkgInfo:${JSON.stringify(this.pkgInfo)}`);
  }

  resolveSource() {
    const { cwd } = this;
    const normalSource = resolve(cwd, 'src');
    const source = existsSync(normalSource) ? normalSource : cwd;

    this.sourcePath = source;
    debug(`sourcePath: ${this.sourcePath}`);
  }
}
