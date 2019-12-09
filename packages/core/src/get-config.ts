import { join } from 'path';
import createDebug from 'debug';
import { formatWinPath } from '@ez-fe/helper';
import { Config } from './interface';

const debug = createDebug('ez:core');

export function getConfigPaths({ cwd, isWin }: { cwd: string; isWin: boolean }) {
  const configs = ['config/'];
  let configPaths = configs.map(config => join(cwd, config));

  configPaths = isWin ? configPaths.map(formatWinPath) : configPaths;

  debug(`configPaths: ${configPaths}`);

  return configPaths;
}

export function getUserConfig(configPaths: string[]): Config {
  return {};
}
