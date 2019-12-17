import { join } from 'path';
import createDebug from 'debug';
import extend from 'extend';
import { Config } from '@ez-fe/config';
import { formatWinPath, dynamicImport } from '@ez-fe/helper';
import { EZ } from './interface';

const debug = createDebug('core:get-config');

/** 解析配置文件路径 */
export function getConfigPaths({ cwd, isWin }: { cwd: string; isWin: boolean }) {
	const configs = ['config/config.ts'];
	let configPaths = configs.map(config => join(cwd, config));

	configPaths = isWin ? configPaths.map(formatWinPath) : configPaths;

	debug(`configPaths: ${configPaths}`);

	return configPaths;
}

/** 获取配置文件内容 */
async function getConfigContent(configPath: string) {
	let config = await dynamicImport(configPath);

	return config as Config;
}

/** 获取配置文件 */
export async function getConfig(ez: EZ): Promise<Config> {
	const { cwd, isWin, config: baseConfig } = ez;
	const configPaths = getConfigPaths({ cwd, isWin });
	const configs = await Promise.all(configPaths.map(async configPath => await getConfigContent(configPath)));

	return configs.reduce((baseConfig, config) => {
		return extend(true, baseConfig, config);
	}, baseConfig);
}
