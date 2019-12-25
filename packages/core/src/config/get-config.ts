import { join } from 'path';
import createDebug from 'debug';
import extend from 'extend';
import { existsSync } from 'fs';
import { Config } from '@ez-fe/config';
import { formatWinPath, dynamicImport } from '@ez-fe/helper';

import { EZ } from '../interface';

const debug = createDebug('core:get-config');

/** 解析配置文件路径 */
export function getConfigPaths(ez: EZ) {
	const { cwd, isWin, BUILD_ENV } = ez;
	const configs = ['config/config.ts', `config/config.${BUILD_ENV}.ts`];
	let configPaths = configs.map(config => join(cwd, config));

	configPaths = isWin ? configPaths.map(formatWinPath) : configPaths;

	debug(`configPaths: ${configPaths}`);

	return configPaths;
}

/** 获取配置文件内容 */
async function getConfigContent(configPath: string) {
	if (!existsSync(configPath)) {
		return {};
	}

	let config = await dynamicImport(configPath);

	return config;
}

/** 获取配置文件 */
export async function getConfig(ez: EZ): Promise<Config> {
	const { config: baseConfig } = ez;
	const configPaths = getConfigPaths(ez);
	const configs = await Promise.all(configPaths.map(async configPath => await getConfigContent(configPath)));

	const config = configs.reduce((baseConfig, config) => {
		return extend(true, baseConfig, config);
	}, baseConfig);

	debug(`userConfig: ${JSON.stringify(config)}`);
	return config as Config;
}
